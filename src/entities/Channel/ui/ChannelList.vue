<template>
  <div class="channels">
    <div class="channels-header">
      <h2 class="text-[24px]">Каналы</h2>

      <Button @click="createChannel" label="+" class="h-[40px] text-[24px]" />
    </div>

    <div class="channels-list">
      <TransitionGroup name="list">
        <Channel
          v-for="channel in store.channels"
          :key="channel.id"
          :channel
          @activeted="setActiveChannel"
          @rename="rename"
          @remove="deleteChannel"
        />
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/shared/components/Button.vue'
import Channel from './Channel.vue'
import { useChannelsStore } from '../model/store'
import { createChannel } from '@/features/createChannel'
import { setActiveChannel } from '@/features/setActiveChannel'
import { deleteChannel } from '@/features/deleteChannel'
import { rename } from '@/features/renameChannel'

const store = useChannelsStore()
</script>

<style scoped>
@reference '@/app/style/main.css';

.channels {
  @apply max-w-[300px] w-full h-full flex flex-col gap-[16px];
}

.channels-header {
  @apply h-[93px] flex items-center justify-between p-[20px] border-b-2 border-bg-secondary shadow-xs overflow-y-auto bg-bg-primary rounded-md;
}

.channels-list {
  @apply flex flex-col gap-[12px] p-[8px] overflow-y-auto overflow-x-hidden grow bg-bg-primary rounded-md pr-[10px];
}
</style>
