<template>
  <div :class="['flex flex-col max-w-[250px] w-max break-words', { 'self-end': mine }]">
    <p v-if="!mine" class="text-white">
      {{ message.username }}
    </p>

    <p :class="['bg-message text-black p-[8px_12px] rounded-md', { ' !bg-blue text-white': mine }]">
      {{ message.body }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { IMessage } from '../api'

defineProps<{ message: IMessage; mine?: boolean }>()
</script>

<style scoped></style>
