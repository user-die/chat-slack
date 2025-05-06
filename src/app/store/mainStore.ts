import router from '@/router'
import { Pages } from '@/router/types'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

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

    const modal = reactive({
      visible: false,
      header: '',
      showInput: false,
      inputValue: '',
      btnTitle: '',
      accept: (e: string) => {
        console.log(e)
      },
    })

    const closeModal = () => {
      modal.visible = false
      modal.inputValue = ''
    }

    const createModal = (
      header: string,
      showInput: boolean,
      btnTitle: string,
      accept: (e: string) => void,
      initInputValue: string,
    ) => {
      modal.visible = true
      modal.header = header
      modal.showInput = showInput
      modal.btnTitle = btnTitle
      modal.accept = accept
      modal.inputValue = initInputValue
    }

    return { token, username, modal, closeModal, createModal, logout }
  },
  {
    persist: true,
  },
)
