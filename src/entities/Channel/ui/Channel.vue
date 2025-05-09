<template>
  <div class="channel" @click="$emit('activeted', channel)">
    <p># {{ channel.name }}</p>

    <div class="flex items-center gap-[4px]">
      <button class="btn" @click.stop="$emit('rename', channel.id, channel.name)">
        <img :src="editIcon" alt="" />
      </button>

      <button v-if="channel.removable" class="btn" @click.stop="$emit('remove', channel.id)">
        <img :src="deleteIcon" alt="" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Channel } from '../model/types'
import editIcon from '@/shared/assets/icons/edit.svg'
import deleteIcon from '@/shared/assets/icons/delete.svg'

defineProps<{ channel: Channel }>()

defineEmits<{
  (e: 'activeted', channel: Channel): void
  (e: 'rename', id: string, name: string): void
  (e: 'remove', id: string): void
}>()
</script>

<style scoped>
@reference '@/app/style/main.css';

.channel {
  @apply w-full h-[40px] rounded-md bg-bg-item shadow-2xl flex items-center justify-between p-[8px_16px] cursor-pointer;
}

.btn {
  @apply cursor-pointer;
}
</style>
