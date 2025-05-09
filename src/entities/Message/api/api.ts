import { Api } from '@/shared/api/Api'
import type { Message } from '../model/types'

export const getMessages = () => Api.get<Message[]>('messages')

export const addMessage = (body: { body: string; channelId: string; username: string }) =>
  Api.post<Message[]>('messages', body)
