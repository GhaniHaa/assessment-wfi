import type { Ref } from 'vue'

export const useFiltering = <T extends Record<string, any>>(items: Ref<T[]>, searchFields: string[] = []) => {
  const searchQuery = ref('')
  
  const filters = ref<Record<string, any[]>>({})

  // Helper to clear filters
  const resetFilters = () => {
    searchQuery.value = ''
    for (const key in filters.value) {
      filters.value[key] = []
    }
  }

  const filteredItems = computed(() => {
    let result = [...items.value]

    // Apply generic search
    if (searchQuery.value && searchFields.length > 0) {
      const query = searchQuery.value.toLowerCase()
      result = result.filter((item) => 
        searchFields.some(field => {
          const val = item[field]
          return val && String(val).toLowerCase().includes(query)
        })
      )
    }

    // Apply generic attribute filtering
    // We only filter by keys present in the filters object
    for (const [key, allowedValues] of Object.entries(filters.value)) {
      if (allowedValues && allowedValues.length > 0) {
        result = result.filter(item => {
          const itemValue = item[key]
          return allowedValues.includes(itemValue)
        })
      }
    }

    return result
  })

  return {
    searchQuery,
    filters,
    filteredItems,
    resetFilters
  }
}
