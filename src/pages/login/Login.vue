<template>
  <div class="page">
    <div class="wrap">
      <img
        src="/src/assets/icons/icon.png"
        alt=""
        width="200px"
        height="200px"
        class="w-[150px] h-[150px] md:w-[200px] md:h-[200px]"
      />

      <div class="grow w-full max-w-[400px] flex flex-col gap-[20px] items-center">
        <h1 class="text-[38px]">Войти</h1>

        <Input class="w-full" v-model="state.username" label="Имя пользователя" type="text" />

        <Input class="w-full" v-model="state.password" label="Пароль" type="password" />

        <div class="w-full flex items-center justify-between gap-[20px]">
          <Button @click="createUser" class="w-[180px]" label="Войти" :disabled />

          <Button @click="router.push(Pages.SIGNUP)" class="w-[200px]" label="Зарегистрироваться" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Input from '@/components/Input.vue'
import Button from '@/components/Button.vue'
import { useStore } from '@/app/store/mainStore'
import { useRouter } from 'vue-router'
import { computed, reactive } from 'vue'
import { login } from './api'
import { Pages } from '@/router/types'

const store = useStore()
const router = useRouter()

const state = reactive({
  username: '',
  password: '',
})

const disabled = computed(() => !state.username && !state.password)

const createUser = async () => {
  const { data, isFinished } = await login({
    username: state.username,
    password: state.password,
  })

  if (!isFinished.value || !data.value) {
    return
  }

  store.token = data.value.token
  store.username = data.value.username
  router.push(Pages.CHAT)
}
</script>

<style scoped>
@reference "@/assets/style/main.css";

.page {
  @apply h-full w-full flex items-center justify-center;
}

.wrap {
  @apply max-w-[900px] w-full md:h-[400px] bg-bg-primary rounded-xl shadow-lg p-[16px] lg:p-[32px_100px] flex flex-col md:flex-row items-center justify-center gap-[20px] md:gap-[100px];
}
</style>
