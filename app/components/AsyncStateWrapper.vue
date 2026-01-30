<template>
  <div v-if="loading" class="flex justify-center items-center py-20">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
  </div>

  <div v-else-if="error" class="text-center py-20">
    <div class="text-red-600 mb-4">{{ error }}</div>
    <button @click="$emit('retry')" class="btn btn-primary">
      Retry
    </button>
  </div>

  <div v-else>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  loading: boolean
  error: string | null
}>()

defineEmits<{
  retry: []
}>()
</script>
