import type { Ref } from 'vue'

export interface PaginationState {
  currentPage: number
  itemsPerPage: number
}

export const usePagination = (items: Ref<any[]>) => {
  const pagination = ref<PaginationState>({
    currentPage: 1,
    itemsPerPage: 12,
  })

  // Watch items to reset page if needed (Optional, but often good UX)
  // For now we keep it simple as per original store which did this via watchers in the store.

  const paginatedItems = computed(() => {
    const start = (pagination.value.currentPage - 1) * pagination.value.itemsPerPage
    const end = start + pagination.value.itemsPerPage
    return items.value.slice(start, end)
  })

  const totalPages = computed(() => {
    return Math.ceil(items.value.length / pagination.value.itemsPerPage)
  })

  return {
    pagination,
    paginatedItems,
    totalPages
  }
}
