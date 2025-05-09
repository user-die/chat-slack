import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { createArg } from './types'

export const useModalStore = defineStore('useModalStore', () => {
  const modal = reactive({
    visible: false,
    header: '',
    showInput: false,
    inputValue: '',

    accept: (e: string) => {
      console.log(e)
    },
  })

  const closeModal = () => {
    modal.visible = false
    modal.inputValue = ''
  }

  const createModal = (arg: createArg) => {
    modal.visible = true
    modal.header = arg.header || ''
    modal.showInput = arg.showInput || false
    modal.inputValue = arg.initInputValue || ''
    modal.accept = arg.accept
  }

  return {
    modal,
    closeModal,
    createModal,
  }
})
