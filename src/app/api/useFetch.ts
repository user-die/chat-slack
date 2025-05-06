import { createFetch } from '@vueuse/core'
import { useStore } from '../store/mainStore'
import { toast } from 'vue3-toastify'
import getError from './Errors'

const useAppFetch = createFetch({
  baseUrl: '/api/v1/',
  combination: 'overwrite',
  options: {
    async beforeFetch({ options }) {
      const store = useStore()

      if (options.headers)
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${store.token}`,
        }

      return { options }
    },

    onFetchError(ctx) {
      const store = useStore()

      if (ctx.data.statusCode) {
        store.logout()
      }

      toast(getError(ctx.data.error), {
        theme: 'dark',
        type: 'error',
        autoClose: 5000,
      })

      return ctx
    },
  },
})

export default useAppFetch
