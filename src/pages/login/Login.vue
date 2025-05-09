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
        <h1 class="text-[38px]">Войти</h1>

        <Input class="w-full" v-model="state.username" label="Имя пользователя" type="text" />

        <Input class="w-full" v-model="state.password" label="Пароль" type="password" />

        <div class="w-full flex items-center justify-between gap-[20px]">
          <Button
            @click="Login(state.username, state.password)"
            class="w-[180px]"
            label="Войти"
            :disabled
          />

          <Button @click="goToSingin" class="w-[200px]" label="Зарегистрироваться" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Input from '@/shared/components/Input.vue'
import Button from '@/shared/components/Button.vue'
import { computed, reactive } from 'vue'
import { Login } from '@/features/login'
import { goToSingin } from '@/features/goToSignin'
import mainIcon from '@/shared/assets/icons/icon.png'

const state = reactive({
  username: '',
  password: '',
})

const disabled = computed(() => !state.username && !state.password)
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
