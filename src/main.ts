import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/style/main.css'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import Vue3Toastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(router).use(pinia).use(Vue3Toastify).mount('#app')
