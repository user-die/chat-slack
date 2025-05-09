<template>
  <button class="btn">
    <p>{{ label }}</p>
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineProps<{ label?: string }>()
</script>

<style scoped>
@reference '@/app/style/main.css';

.btn {
  @apply bg-bg-item rounded-md p-[12px] shadow-2xl text-[18px] cursor-pointer text-center flex items-center justify-center text-white;
}
</style>
