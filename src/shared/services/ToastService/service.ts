import type { ToastService } from './types'
import { toast } from 'vue3-toastify'

export const useToastService: () => ToastService = () => {
  const create = (message: string, type: 'success' | 'error') => {
    toast(message, {
      theme: 'dark',
      type,
      autoClose: 5000,
    })
  }

  return {
    create,
  }
}
