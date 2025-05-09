import { useStore } from '@/app/store/mainStore'
import { useModalService, type ModalService } from '@/shared/services/ModalService'

export const exit = () => {
  const modalService: ModalService = useModalService()
  const store = useStore()

  modalService.create({
    message: 'Выход из аккаунта',
    header: 'Выйти',
    showInput: false,
    accept: async (channelName: string) => {
      store.logout()
    },
  })
}
