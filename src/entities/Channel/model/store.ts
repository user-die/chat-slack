import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Channel } from './types'
import { io } from 'socket.io-client'
import { getChannels } from '../api/api'

export const useChannelsStore = defineStore('useChannelsStore', () => {
  const channels = ref<Channel[]>([])
  const currentChannel = ref<Channel>()

  getChannels().then((res) => {
    if (res.data.value) {
      channels.value = res.data.value

      currentChannel.value = res.data.value[0]
    }
  })

  const setActiveChannel = (channel: Channel) => {
    currentChannel.value = channel
  }

  const socket = io()

  socket.on('newChannel', (payload: Channel) => {
    channels.value?.push(payload)
  })

  socket.on('renameChannel', (payload: Channel) => {
    if (channels.value) {
      channels.value.filter((el) => el.id === payload.id)[0].name = payload.name
    }
  })

  socket.on('removeChannel', (payload: Channel) => {
    if (channels.value) {
      channels.value = channels.value.filter((el) => el.id !== payload.id)
    }
  })

  return {
    channels,
    currentChannel,
    setActiveChannel,
  }
})
