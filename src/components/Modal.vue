<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="store.modal.visible" class="wrap">
        <div class="modal">
          <div class="flex flex-col justify-between h-full">
            <h1 class="text-[20px]">{{ store.modal.header }}</h1>

            <Input
              v-if="store.modal.showInput"
              v-model="store.modal.inputValue"
              label="Название канала"
            />

            <div class="flex justify-end gap-[16px]">
              <Button @click="store.closeModal" label="Закрыть" class="h-[40px]" />
              <Button
                @click="
                  async () => {
                    await store.modal.accept(store.modal.inputValue)
                    store.closeModal()
                  }
                "
                :label="store.modal.btnTitle"
                class="h-[40px]"
              />
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { useStore } from '@/app/store/mainStore'
import Button from './Button.vue'
import Input from './Input.vue'

const store = useStore()
</script>

<style scoped>
@reference "@/assets/style/main.css";

.wrap {
  @apply fixed top-0 left-0 w-full h-full z-[100] flex items-center justify-center;

  background-color: rgba(0, 0, 0, 0.4);
  transition: opacity 0.3s ease;
}

.modal {
  @apply w-full h-full max-w-[500px] max-h-[187px] bg-bg-primary rounded-md shadow-2xl p-[16px] text-white;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
