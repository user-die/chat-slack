<template>
  <div class="channel" @click="$emit('activeted', channel)">
    <p># {{ channel.name }}</p>

    <div class="flex items-center gap-[4px]">
      <button class="btn" @click.stop="$emit('rename', channel.id, channel.name)">
        <img src="@/assets/icons/edit.svg" alt="" />
      </button>

      <button v-if="channel.removable" class="btn" @click.stop="$emit('remove', channel.id)">
        <img src="@/assets/icons/delete.svg" alt="" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IChannel } from '../api'

defineProps<{ channel: IChannel }>()

defineEmits<{
  (e: 'activeted', channel: IChannel): void
  (e: 'rename', id: string, name: string): void
  (e: 'remove', id: string): void
}>()
</script>

<style scoped>
@reference "@/assets/style/main.css";

.channel {
  @apply w-full h-[40px] rounded-md bg-bg-item shadow-2xl flex items-center justify-between p-[8px_16px] cursor-pointer;
}

.btn {
  @apply cursor-pointer;
}
</style>
