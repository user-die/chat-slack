import router from '@/app/router'
import { Pages } from '@/app/router/types'

export const goToSingin = () => {
  router.push(Pages.SIGNUP)
}
