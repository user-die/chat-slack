import { renameChannel } from '@/entities/Channel/api/api'
import { useModalService, type ModalService } from '@/shared/services/ModalService'
import { useToastService, type ToastService } from '@/shared/services/ToastService'

export const rename = (id: string, name: string) => {
  const modalService: ModalService = useModalService()
  const toastService: ToastService = useToastService()

  modalService.create({
    message: 'Создать канал',
    header: 'Создать',
    showInput: true,
    initInputValue: name,
    accept: async (channelName: string) => {
      const { isFinished, error } = await renameChannel(channelName, id)

      if (isFinished.value && !error.value) {
        toastService.create('Канал создан', 'success')
      }
    },
  })
}
