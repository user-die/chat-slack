<template>
  <div class="channels">
    <div class="channels-header">
      <h2 class="text-[24px]">Каналы</h2>

      <Button @click="createModal" label="+" class="h-[40px] text-[24px]" />
    </div>

    <div class="channels-list">
      <TransitionGroup name="list">
        <Channel
          v-for="channel in channels"
          :key="channel.id"
          :channel
          @activeted="setActiveChannel"
          @rename="renameModal"
          @remove="removeModal"
        />
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/Button.vue'
import Channel from './Channel.vue'
import { useStore } from '@/app/store/mainStore'
import { io } from 'socket.io-client'
import { ref } from 'vue'
import { addChannel, getChannels, removeChannel, renameChannel, type IChannel } from '../api'
import { toast } from 'vue3-toastify'

const emit = defineEmits<{
  (e: 'active', channel: IChannel): void
}>()

const store = useStore()
const socket = io()

const channels = ref<IChannel[]>([])

getChannels().then((res) => {
  if (res.data.value) {
    channels.value = res.data.value

    emit('active', res.data.value[0])
  }
})

const setActiveChannel = (channel: IChannel) => {
  emit('active', channel)
}

socket.on('newChannel', (payload: IChannel) => {
  channels.value?.push(payload)
})

socket.on('renameChannel', (payload: IChannel) => {
  if (channels.value) {
    channels.value.filter((el) => el.id === payload.id)[0].name = payload.name
  }
})

socket.on('removeChannel', (payload: IChannel) => {
  if (channels.value) {
    channels.value = channels.value.filter((el) => el.id !== payload.id)
  }
})

const createModal = () => {
  store.createModal(
    'Создать канал',
    true,
    'Создать',
    async (channelName: string) => {
      const { isFinished } = await addChannel(channelName)

      if (isFinished.value) {
        toast('Канал создан', {
          theme: 'dark',
          type: 'success',
          autoClose: 5000,
        })
      }
    },
    '',
  )
}

const renameModal = (id: string, name: string) => {
  store.createModal(
    'Переименовать канал',
    true,
    'Применить',
    async (channelName: string) => {
      const { isFinished } = await renameChannel(channelName, id)

      if (isFinished.value) {
        toast('Канал переименован', {
          theme: 'dark',
          type: 'success',
          autoClose: 5000,
        })
      }
    },
    name,
  )
}

const removeModal = (id: string) => {
  store.createModal(
    'Удаление канала',
    false,
    'Удалить',
    async () => {
      const { isFinished } = await removeChannel(id)

      if (isFinished.value) {
        toast('Канал удалён', {
          theme: 'dark',
          type: 'success',
          autoClose: 5000,
        })
      }
    },
    '',
  )
}
</script>

<style scoped>
@reference "@/assets/style/main.css";

.channels {
  @apply max-w-[300px] w-full h-full flex flex-col gap-[16px];
}

.channels-header {
  @apply h-[93px] flex items-center justify-between p-[20px] border-b-2 border-bg-secondary shadow-xs overflow-y-auto bg-bg-primary rounded-md;
}

.channels-list {
  @apply flex flex-col gap-[12px] p-[8px] overflow-y-auto overflow-x-hidden grow bg-bg-primary rounded-md pr-[10px];
}
</style>
