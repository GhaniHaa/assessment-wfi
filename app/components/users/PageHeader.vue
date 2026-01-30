<template>
  <header class="bg-white border-b border-slate-200 sticky top-0 z-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="flex items-center justify-end">
        <button @click="$emit('add-user')" class="btn btn-primary">
          <Icon name="heroicons:plus" class="w-5 h-5 mr-2" />
          Add User
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  filteredCount: number
  totalCount: number
  hasFilters: boolean
}>()

defineEmits<{
  'add-user': []
}>()
</script>
