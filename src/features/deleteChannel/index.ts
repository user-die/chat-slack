import { removeChannel } from '@/entities/Channel/api/api'
import { useModalService, type ModalService } from '@/shared/services/ModalService'
import { useToastService, type ToastService } from '@/shared/services/ToastService'

export const deleteChannel = (id: UniqueId) => {
  const modalService: ModalService = useModalService()
  const toastService: ToastService = useToastService()

  modalService.create({
    message: 'Удаление канала',
    header: 'Удалить',
    accept: async () => {
      const { isFinished, error } = await removeChannel(id)

      if (isFinished.value && !error.value) {
        toastService.create('Канал удалён', 'success')
      }
    },
  })
}
