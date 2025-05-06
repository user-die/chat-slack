<template>
  <div class="input-container">
    <label class="label" for="">{{ label }}</label>

    <input
      v-bind="$attrs"
      v-model="model"
      class="input"
      :invalid="Boolean(error)"
      autocomplete="off"
    />

    <span class="error">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
const model = defineModel<string>()
defineProps<{ label?: string; error?: string }>()
</script>

<style scoped>
@reference "@/assets/style/main.css";

.input-container {
  @apply relative;
}

.input {
  @apply bg-bg-item w-full h-[58px] rounded-md p-[14px_16px] shadow-2xl text-[20px] border-3  border-transparent focus:border-green  active:border-green text-white;

  transition: all 0.2s ease-in-out;
  outline: 0;
}

.label {
  @apply absolute left-[18px] text-white;

  transition: all 0.2s;
}

.error {
  @apply absolute left-[4px] bottom-[-19px] text-red-400;
}
</style>
