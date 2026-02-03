import type { Ref } from 'vue'

export const useSorting = <T extends Record<string, any>>(items: Ref<T[]>, defaultField: string = 'id') => {
  const sortField = ref<string>(defaultField)
  const sortOrder = ref<'asc' | 'desc'>('asc')

  const sortedItems = computed(() => {
    const result = [...items.value]

    result.sort((a, b) => {
      let aVal = a[sortField.value]
      let bVal = b[sortField.value]

      // Determine if dealing with full name (special case often needed, making it optional logic or keeping it simple for now)
      // For a truly generic sort, we might let the caller provide a key-mapper or just rely on the prop existing.
      // If the field is 'firstName' and 'lastName' exists, we could concat, but let's keep it strictly field-based for generic.
      // However, to replicate the previous behavior, the user might need to map data first or we handle customization.
      // For this refactor, I'll make it generic but 'firstName' aware if properties exist, or assume data is prepared.
      
      // Actually, to keep it truly generic, we should probably stick to the property values.
      // If the USER wants full name sorting, they should sort by a full name property, or we provide a transform function.
      
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        aVal = aVal.toLowerCase()
        bVal = bVal.toLowerCase()
      }

      if (aVal < bVal) return sortOrder.value === 'asc' ? -1 : 1
      if (aVal > bVal) return sortOrder.value === 'asc' ? 1 : -1
      return 0
    })

    return result
  })

  return {
    sortField,
    sortOrder,
    sortedItems
  }
}
