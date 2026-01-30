<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/50" @click="$emit('cancel')"></div>

      <!-- Dialog -->
      <div class="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-scale-in">
        <div class="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
          <Icon name="heroicons:exclamation-triangle" class="w-6 h-6 text-red-600" />
        </div>

        <h3 class="text-xl font-bold text-slate-900 text-center mb-2">{{ title }}</h3>
        <p class="text-slate-600 text-center mb-6">{{ message }}</p>

        <div class="flex gap-3">
          <button @click="$emit('cancel')" class="btn btn-secondary flex-1">
            Cancel
          </button>
          <button @click="$emit('confirm')" class="btn btn-danger flex-1">
            Delete
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  message: string
}>()

defineEmits<{
  confirm: []
  cancel: []
}>()
</script>
