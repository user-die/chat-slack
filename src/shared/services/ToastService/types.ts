export interface ToastService {
  create(message: string, type: 'success' | 'error'): void
}
