<template>
  <div class="chat">
    <div class="header">
      <div class="flex gap-[24px] items-center">
        <Button class="block md:!hidden" @click="$emit('toggle')">
          <img src="@/shared/assets/icons/menu.svg" />
        </Button>

        <div>
          <p class="text-[24px]"># {{ channelsStore.currentChannel?.name }}</p>

          <p>{{ messagesStore.messages?.length }} сообщений</p>
        </div>
      </div>

      <Button label="Выйти" @click="exit" />
    </div>

    <div class="messages">
      <TransitionGroup name="list">
        <Message
          v-for="message in messagesStore.messages"
          :key="message.id"
          :message
          :mine="store.username === message.username"
        />
      </TransitionGroup>
    </div>

    <form @submit.prevent="messagesStore.send" class="flex gap-[12px]">
      <Input v-model="messagesStore.message" class="grow" label="Введите сообщение" />

      <Button type="submit" class="text-white">
        <img src="@/shared/assets/icons/send.svg" />
      </Button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { exit } from '@/features/exit'
import Input from '@/shared/components/Input.vue'
import Button from '@/shared/components/Button.vue'
import { useStore } from '@/app/store/mainStore'
import { useMessageStore } from '../model/store'
import { useChannelsStore } from '@/entities/Channel/model/store'
import Message from '@/entities/Message/ui/Message.vue'

defineEmits(['toggle'])
const store = useStore()
const messagesStore = useMessageStore()
const channelsStore = useChannelsStore()
</script>

<style scoped>
@reference '@/app/style/main.css';

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
