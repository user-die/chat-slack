import { addChannel } from '@/entities/Channel/api/api'
import { useModalService, type ModalService } from '@/shared/services/ModalService'
import { useToastService, type ToastService } from '@/shared/services/ToastService'

export const createChannel = () => {
  const modalService: ModalService = useModalService()
  const toastService: ToastService = useToastService()

  modalService.create({
    message: 'Создать канал',
    header: 'Создать',
    showInput: true,
    accept: async (value: string) => {
      const { isFinished, error } = await addChannel(value)

      if (isFinished.value && !error.value) {
        toastService.create('Канал создан', 'success')
      }
    },
  })
}
