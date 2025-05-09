<template>
  <main class="main">
    <RouterView />
  </main>
</template>

<style scoped>
@reference '@/app/style/main.css';

.main {
  @apply w-full h-full bg-bg-secondary text-text-primary p-[16px];
}
</style>
