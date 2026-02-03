import { type Ref, watch, ref, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'

interface SyncOptions {
  pagination?: Ref<{ currentPage: number; itemsPerPage: number }>
  searchQuery?: Ref<string>
  filters?: Ref<Record<string, any[]>>
  sortField?: Ref<string>
  sortOrder?: Ref<'asc' | 'desc'>
  filterKeys?: Record<string, string> // Map generic store key (e.g. 'role') to URL key (e.g. 'roles')
}

export const useUrlSync = ({ 
  pagination, 
  searchQuery, 
  filters, 
  sortField, 
  sortOrder,
  filterKeys = {} 
}: SyncOptions) => {
  const router = useRouter()
  const route = useRoute()

  const isSyncing = ref(false)

  async function syncFromUrl() {
    isSyncing.value = true
    if (pagination && route.query.page) {
      pagination.value.currentPage = parseInt(route.query.page as string, 10)
    }
    if (pagination && route.query.limit) {
      pagination.value.itemsPerPage = parseInt(route.query.limit as string, 10)
    }
    if (searchQuery && route.query.search) {
      searchQuery.value = route.query.search as string
    }
    
    if (filters) {
      // iterate over filterKeys
      for (const [storeKey, urlQueryKey] of Object.entries(filterKeys)) {
        if (route.query[urlQueryKey]) {
           const val = route.query[urlQueryKey]
           filters.value[storeKey] = Array.isArray(val)
              ? val.filter((v): v is string => v !== null)
              : [val].filter((v): v is string => v !== null)
        }
      }
    }

    if (sortField && route.query.sort) {
      sortField.value = route.query.sort as string
    }
    if (sortOrder && route.query.order) {
      sortOrder.value = route.query.order as 'asc' | 'desc'
    }
    
    await nextTick()
    isSyncing.value = false
  }

  function syncToUrl() {
    const query: Record<string, string | number | string[]> = {}

    if (pagination && pagination.value.currentPage > 1) {
      query.page = pagination.value.currentPage
    }
    // Assumes default of 12 for limit, should be config? Kept simple.
    if (pagination && pagination.value.itemsPerPage !== 12) {
      query.limit = pagination.value.itemsPerPage
    }
    if (searchQuery && searchQuery.value) {
      query.search = searchQuery.value
    }
    
    if (filters) {
      for (const [storeKey, urlQueryKey] of Object.entries(filterKeys)) {
        if (filters.value[storeKey] && filters.value[storeKey].length > 0) {
          query[urlQueryKey] = filters.value[storeKey]
        }
      }
    }

    if (sortField && sortField.value !== 'id' && sortField.value !== 'firstName') { // Todo: default config
       query.sort = sortField.value
    }
    if (sortOrder && sortOrder.value !== 'asc') {
      query.order = sortOrder.value
    }

    router.push({ query })
  }

  // Setup watchers
  if (searchQuery && filters && pagination) {
    watch([searchQuery, filters], () => {
      if (isSyncing.value) return
      pagination.value.currentPage = 1
    }, { deep: true })
  }

  const watchSource = [
    searchQuery, 
    filters, 
    sortField, 
    sortOrder, 
    pagination
  ].filter(Boolean) as any[]

  watch(
    watchSource,
    () => {
      if (isSyncing.value) return
      syncToUrl()
    },
    { deep: true }
  )

  return {
    syncFromUrl,
    syncToUrl
  }
}
