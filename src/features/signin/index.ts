import { createNewUser } from './api'
import { Pages } from '@/app/router/types'
import router from '@/app/router'
import { useStore } from '@/app/store/mainStore'

const store = useStore()

export const createUser = async (
  username: string,
  password: string,
  validate: () => Promise<{ valid: boolean }>,
) => {
  const res = await validate()

  if (!res.valid) {
    return
  }

  const { data, isFinished } = await createNewUser({
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
