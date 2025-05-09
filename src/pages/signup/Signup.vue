<template>
  <div class="page">
    <div class="wrap">
      <img
        :src="mainIcon"
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

        <Button
          @click="createUser(username, password, validate)"
          class="w-[200px]"
          label="Зарегистрироваться"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Input from '@/shared/components/Input.vue'
import Button from '@/shared/components/Button.vue'
import mainIcon from '@/shared/assets/icons/icon.png'
import { createUser } from '@/features/signin'
import { useForm } from 'vee-validate'
import * as yup from 'yup'

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
</script>

<style scoped>
@reference '@/app/style/main.css';

.page {
  @apply h-full w-full flex items-center justify-center;
}

.wrap {
  @apply max-w-[900px] w-full md:h-[400px] bg-bg-primary rounded-xl shadow-lg p-[16px] lg:p-[32px_100px] flex flex-col md:flex-row items-center justify-center gap-[20px] md:gap-[100px];
}
</style>
