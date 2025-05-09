import { Api } from '@/shared/api/Api'
import type { Channel } from '../model/types'

export const getChannels = () => Api.get<Channel[]>('channels')

export const addChannel = (name: string) => Api.post('channels', { name })

export const renameChannel = (name: string, id: string) => Api.patch(`channels/${id}`, { name })

export const removeChannel = (id: string) => Api.delete(`channels/${id}`)
