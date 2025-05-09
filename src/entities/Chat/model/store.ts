import { useStore } from '@/app/store/mainStore'
import { useChannelsStore } from '@/entities/Channel/model/store'
import { addMessage, getMessages } from '@/entities/Message/api/api'
import type { Message } from '@/entities/Message/model/types'
import { defineStore } from 'pinia'
import { io } from 'socket.io-client'
import { ref, watch } from 'vue'

export const useMessageStore = defineStore('MessageStore', () => {
  const message = ref('')
  const messages = ref<Message[]>([])
  const channelsStore = useChannelsStore()
  const mainStore = useStore()

  watch(
    () => channelsStore.currentChannel,
    () => {
      getMessages().then((res) => {
        if (res.data.value) {
          messages.value = res.data.value.filter(
            (el) => el.channelId === channelsStore.currentChannel?.id,
          )
        }
      })
    },
  )

  const send = () => {
    if (channelsStore.currentChannel && message.value) {
      addMessage({
        body: message.value,
        channelId: channelsStore.currentChannel.id,
        username: mainStore.username,
      })
      message.value = ''
    }
  }

  const socket = io()

  socket.on('newMessage', (payload: Message) => {
    if (payload.channelId === channelsStore.currentChannel?.id) {
      messages.value.push(payload)
    }
  })

  return {
    send,
    message,
    messages,
  }
})
