import router from '@/app/router'
import { Pages } from '@/app/router/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStore = defineStore(
  'main',
  () => {
    const token = ref('')
    const username = ref('')

    const logout = () => {
      token.value = ''
      username.value = ''
      router.push(Pages.LOGIN)
    }

    return { token, username, logout }
  },
  {
    persist: true,
  },
)
