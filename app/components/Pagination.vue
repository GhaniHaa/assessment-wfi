<template>
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-4">
      <div class="flex items-center text-sm text-slate-600">
        <span class="mr-2">Limit:</span>
        <select
          :value="itemsPerPage"
          class="rounded-lg border-slate-200 text-sm focus:border-primary-500 focus:ring-primary-500 py-1 pr-8"
          @change="handleLimitChange"
        >
          <option :value="12">12</option>
          <option :value="25">25</option>
          <option :value="50">50</option>
          <option :value="100">100</option>
        </select>
      </div>
      <div class="text-sm text-slate-600">
        Page {{ currentPage }} of {{ totalPages }}
      </div>
    </div>

    <div v-if="totalPages > 1" class="flex items-center gap-2">
      <!-- Previous Button -->
      <button
        :disabled="currentPage === 1"
        class="btn btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
        @click="goToPage(currentPage - 1)"
      >
        <Icon name="heroicons:chevron-left" class="w-5 h-5" />
      </button>

      <!-- Page Numbers -->
      <div class="hidden sm:flex items-center gap-1">
        <button
          v-for="page in visiblePages"
          :key="page"
          :class="[
            'min-w-[2.5rem] h-10 rounded-lg font-medium transition-colors',
            page === currentPage
              ? 'bg-primary-600 text-white'
              : typeof page === 'number'
              ? 'hover:bg-slate-100 text-slate-700'
              : 'cursor-default text-slate-400'
          ]"
          :disabled="typeof page !== 'number'"
          @click="typeof page === 'number' ? goToPage(page) : null"
        >
          {{ page }}
        </button>
      </div>

      <!-- Next Button -->
      <button
        :disabled="currentPage === totalPages"
        class="btn btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
        @click="goToPage(currentPage + 1)"
      >
        <Icon name="heroicons:chevron-right" class="w-5 h-5" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const currentPage = defineModel<number>('currentPage', { required: true })
const itemsPerPage = defineModel<number>('itemsPerPage', { required: true })

const { totalPages } = defineProps<{
  totalPages: number
}>()

const visiblePages = computed(() => {
  const pages: (number | string)[] = []
  const maxVisible = 7

  if (totalPages <= maxVisible) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
  } else {
    if (currentPage.value <= 4) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(totalPages)
    } else if (currentPage.value >= totalPages - 3) {
      pages.push(1)
      pages.push('...')
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)
      pages.push('...')
      for (let i = currentPage.value - 1; i <= currentPage.value + 1; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(totalPages)
    }
  }

  return pages
})

function goToPage(page: number) {
  if (page >= 1 && page <= totalPages) {
    currentPage.value = page
  }
}

function handleLimitChange(event: Event) {
  const value = Number((event.target as HTMLSelectElement).value)
  itemsPerPage.value = value
  currentPage.value = 1
}
</script>
