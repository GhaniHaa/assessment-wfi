import type { Ref } from 'vue'
import type { User, SortField } from '@/types/user'
import { useFiltering } from '@/stores/common/useFiltering'
import { useSorting } from '@/stores/common/useSorting'
import { usePagination } from '@/stores/common/usePagination'
import { useUrlSync } from '@/stores/common/useUrlSync'

export const useUserClient = (users: Ref<User[]>) => {
  // 1. Filtering
  // We configure the generic filtering to 'know' about User fields if we want search to work on them
  const { 
    searchQuery, 
    filters, 
    filteredItems: filteredUsers,
    resetFilters
  } = useFiltering(users, ['firstName', 'lastName', 'email', 'username'])

  // Initialize specific filter keys we care about
  filters.value.role = []
  filters.value.gender = []

  // 2. Sorting
  const { 
    sortField: _sortField, 
    sortOrder, 
    sortedItems: sortedUsers 
  } = useSorting(filteredUsers, 'firstName')

  const sortField = _sortField as Ref<SortField>

  // 3. Pagination
  const { 
    pagination, 
    paginatedItems: paginatedUsers, 
    totalPages 
  } = usePagination(sortedUsers)

  // 4. URL Sync
  // We map the Generic Store Keys to URL Query Keys
  const { syncFromUrl, syncToUrl } = useUrlSync({
    pagination,
    searchQuery,
    filters,
    sortField,
    sortOrder,
    filterKeys: {
      'role': 'roles',     // store key 'role' -> url key 'roles'
      'gender': 'genders'  // store key 'gender' -> url key 'genders'
    }
  })

  return {
    searchQuery,
    filters,
    sortField,
    sortOrder,
    pagination,
    filteredUsers,
    sortedUsers,
    paginatedUsers,
    totalPages,
    syncFromUrl,
    syncToUrl,
    resetFilters
  }
}
