<template>
  <div class="page">
    <Transition :name="breakpoints.greater('md').value ? '' : 'slide'">
      <ChannelList
        @active="store.setActiveChannel"
        v-show="visibleChannels || breakpoints.greater('md').value"
        :class="[
          'absolute p-[16px] md:p-0  top-0 md:static z-[100] left-[0px] ',
          { 'left-[-300px]': !visibleChannels },
        ]"
      />
    </Transition>

    <div
      :class="['wrap', { 'md:hidden': visibleChannels }]"
      v-if="visibleChannels"
      @click="toggleChannelsVisible"
    ></div>

    <Chat
      class="relative z-[1]"
      :key="store.currentChannel?.id"
      :activeChannel="store.currentChannel"
      @toggle="toggleChannelsVisible"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Chat from '../../entities/Chat/ui/Chat.vue'
import ChannelList from '@/entities/Channel/ui/ChannelList.vue'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { useChannelsStore } from '@/entities/Channel/model/store'

const store = useChannelsStore()
const breakpoints = useBreakpoints(breakpointsTailwind)
const visibleChannels = ref<boolean>(false)

const toggleChannelsVisible = () => {
  visibleChannels.value = !visibleChannels.value
}
</script>

<style scoped>
@reference '@/app/style/main.css';

.page {
  @apply h-full flex gap-[16px];
}

.wrap {
  @apply absolute w-full h-full top-0 left-0 z-[10];
  background: rgba(0, 0, 0, 0.6);
}

.slide-enter-active {
  transition: all 0.6s ease;
  transform: translateX(-90%);
  opacity: 1;
}

.slide-enter-to {
  transition: all 0.6s ease;
  transform: translateX(0%);
}

.slide-leave-active {
  transition: all 0.6s ease;
  transform: translateX(-90%);
  opacity: 0.9;
}
</style>
