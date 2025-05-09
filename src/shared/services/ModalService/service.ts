import { useModalStore } from './store'
import type { ModalService, createArg } from './types'

export const useModalService: () => ModalService = () => {
  const ModalStore = useModalStore()

  const create = (arg: createArg) => {
    ModalStore.createModal(arg)
  }

  return {
    create,
  }
}
