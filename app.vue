<!-- <template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// Initialize auth store on app mount
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()
auth.initializeAuth()
</script> -->

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth'
import { onMounted } from 'vue'

const authStore = useAuthStore()

onMounted(() => {
  authStore.initializeAuth()
})
</script>