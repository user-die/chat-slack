import { useChannelsStore } from '@/entities/Channel/model/store'
import type { Channel } from '@/entities/Channel/model/types'

export const setActiveChannel = (Channel: Channel) => {
  const ChannelsStore = useChannelsStore()
  ChannelsStore.setActiveChannel(Channel)
}
