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
        <h1 class="text-[38px]">Регистрация</h1>

        <Input
          class="w-full"
          v-model="username"
          label="Имя пользователя"
          type="text"
          :error="errors.username"
        />

        <Input
          class="w-full"
          v-model="password"
          label="Пароль"
          type="password"
          :error="errors.password"
        />

        <Input
          class="max-w-[400px] w-full"
          v-model="confirmPassword"
          label="Подтвердите пароль"
          type="password"
          :error="errors.confirmPassword"
        />

        <Button @click="createUser" class="w-[200px]" label="Зарегистрироваться" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Input from '@/components/Input.vue'
import Button from '@/components/Button.vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { createNewUser } from './api'
import { useStore } from '@/app/store/mainStore'
import { useRouter } from 'vue-router'
import { Pages } from '@/router/types'

const store = useStore()
const router = useRouter()

const validationSchema = yup.object({
  username: yup
    .string()
    .required('Обязательное поле')
    .min(6, 'Минимальное количество символов - 6'),
  password: yup
    .string()
    .required('Обязательное поле')
    .min(6, 'Минимальное количество символов - 6'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Пароли не совпадают')
    .required('Обязательное поле')
    .min(6, 'Минимальное количество символов - 6'),
})

const { errors, defineField, validate } = useForm({
  validationSchema,
})

const [username] = defineField('username')
const [password] = defineField('password')
const [confirmPassword] = defineField('confirmPassword')

const createUser = async () => {
  const res = await validate()

  if (!res.valid) {
    return
  }

  const { data, isFinished } = await createNewUser({
    username: username.value,
    password: password.value,
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
