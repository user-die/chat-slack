<template>
  <div class="chat">
    <div class="header">
      <div class="flex gap-[24px] items-center">
        <Button class="block md:!hidden" @click="$emit('toggle')">
          <img src="@/assets/icons/menu.svg" />
        </Button>

        <div>
          <p class="text-[24px]"># {{ activeChannel?.name }}</p>

          <p>{{ messages?.length }} сообщений</p>
        </div>
      </div>

      <Button label="Выйти" @click="logout" />
    </div>

    <div class="messages">
      <TransitionGroup name="list">
        <Message
          v-for="message in messages"
          :key="message.id"
          :message
          :mine="store.username === message.username"
        />
      </TransitionGroup>
    </div>

    <form @submit.prevent="send" class="flex gap-[12px]">
      <Input v-model="message" class="grow" label="Введите сообщение" />

      <Button @click="send" class="text-white">
        <img src="@/assets/icons/send.svg" />
      </Button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { addMessage, getMessages, type IChannel, type IMessage } from '../api'
import { io } from 'socket.io-client'
import Input from '@/components/Input.vue'
import Button from '@/components/Button.vue'
import { useStore } from '@/app/store/mainStore'
import Message from './Message.vue'

defineEmits(['toggle'])
const store = useStore()
const props = defineProps<{ activeChannel?: IChannel }>()
const message = ref('')
const messages = ref<IMessage[]>([])

getMessages().then((res) => {
  if (res.data.value) {
    messages.value = res.data.value.filter((el) => el.channelId === props.activeChannel?.id)
  }
})

const send = () => {
  if (props.activeChannel && message.value) {
    addMessage({ body: message.value, channelId: props.activeChannel.id, username: store.username })
    message.value = ''
  }
}

const socket = io()

socket.on('newMessage', (payload: IMessage) => {
  if (payload.channelId === props.activeChannel?.id) {
    messages.value.push(payload)
  }
})

const logout = () => {
  store.createModal(
    'Выход из аккаунта',
    false,
    'Выйти',
    () => {
      store.logout()
    },
    '',
  )
}
</script>

<style scoped>
@reference "@/assets/style/main.css";

.chat {
  @apply flex flex-col grow gap-[16px];
}

.header {
  @apply flex items-center justify-between p-[20px] border-b-2 border-l-2 border-bg-secondary shadow-xs bg-bg-primary h-[93px] rounded-md;
}

.messages {
  @apply grow  flex flex-col gap-[12px] shadow-xs overflow-y-auto overflow-x-hidden pr-[10px];
}
</style>
