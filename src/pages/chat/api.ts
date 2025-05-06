import { Api } from '@/app/api/Api'

export interface IChannel {
  id: string
  name: string
  removable: boolean
}

export interface IMessage {
  body: string
  channelId: string
  id: string
  username: string
}

export const getChannels = () => Api.get<IChannel[]>('channels')

export const addChannel = (name: string) => Api.post('channels', { name })

export const renameChannel = (name: string, id: string) => Api.patch(`channels/${id}`, { name })

export const removeChannel = (id: string) => Api.delete(`channels/${id}`)

export const getMessages = () => Api.get<IMessage[]>('messages')

export const addMessage = (body: { body: string; channelId: string; username: string }) =>
  Api.post<IMessage[]>('messages', body)
