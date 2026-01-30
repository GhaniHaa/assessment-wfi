<template>
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-4">
      <div class="flex items-center text-sm text-slate-600">
        <span class="mr-2">Limit:</span>
        <select
          :value="itemsPerPage"
          @change="handleLimitChange"
          class="rounded-lg border-slate-200 text-sm focus:border-primary-500 focus:ring-primary-500 py-1 pr-8"
        >
          <option :value="12">12</option>
          <option :value="25">25</option>
          <option :value="50">50</option>
          <option :value="200">200</option>
        </select>
      </div>
      <div class="text-sm text-slate-600">
        Page {{ currentPage }} of {{ totalPages }}
      </div>
    </div>

    <div class="flex items-center gap-2">
      <!-- Previous Button -->
      <button
        @click="goToPage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="btn btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Icon name="heroicons:chevron-left" class="w-5 h-5" />
      </button>

      <!-- Page Numbers -->
      <div class="hidden sm:flex items-center gap-1">
        <button
          v-for="page in visiblePages"
          :key="page"
          @click="typeof page === 'number' ? goToPage(page) : null"
          :class="[
            'min-w-[2.5rem] h-10 rounded-lg font-medium transition-colors',
            page === currentPage
              ? 'bg-primary-600 text-white'
              : typeof page === 'number'
              ? 'hover:bg-slate-100 text-slate-700'
              : 'cursor-default text-slate-400'
          ]"
          :disabled="typeof page !== 'number'"
        >
          {{ page }}
        </button>
      </div>

      <!-- Next Button -->
      <button
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="btn btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Icon name="heroicons:chevron-right" class="w-5 h-5" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  currentPage: number
  totalPages: number
  itemsPerPage: number
}>()

const emit = defineEmits<{
  'update:currentPage': [value: number]
  'update:itemsPerPage': [value: number]
}>()

const visiblePages = computed(() => {
  const pages: (number | string)[] = []
  const maxVisible = 7

  if (props.totalPages <= maxVisible) {
    for (let i = 1; i <= props.totalPages; i++) {
      pages.push(i)
    }
  } else {
    if (props.currentPage <= 4) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(props.totalPages)
    } else if (props.currentPage >= props.totalPages - 3) {
      pages.push(1)
      pages.push('...')
      for (let i = props.totalPages - 4; i <= props.totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)
      pages.push('...')
      for (let i = props.currentPage - 1; i <= props.currentPage + 1; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(props.totalPages)
    }
  }

  return pages
})

function goToPage(page: number) {
  if (page >= 1 && page <= props.totalPages) {
    emit('update:currentPage', page)
  }
}

function handleLimitChange(event: Event) {
  const value = Number((event.target as HTMLSelectElement).value)
  emit('update:itemsPerPage', value)
  emit('update:currentPage', 1)
}
</script>
