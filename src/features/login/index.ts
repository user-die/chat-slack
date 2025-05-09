import router from '@/app/router'
import { Pages } from '@/app/router/types'
import { useStore } from '@/app/store/mainStore'
import { login } from '@/features/login/api'

export const Login = async (username: string, password: string) => {
  const store = useStore()

  const { data, isFinished } = await login({
    username: username,
    password: password,
  })

  if (!isFinished.value || !data.value) {
    return
  }

  store.token = data.value.token
  store.username = data.value.username
  router.push(Pages.CHAT)
}
