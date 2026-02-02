import type { User, FilterState, PaginationState, SortField, SortOrder } from '../types/user'
import { useApi } from '../composables/useApi'

export const useUserStore = defineStore('users', () => {
  const api = useApi()
  const router = useRouter()
  const route = useRoute()

  // ===== Server-derived State =====
  const users = ref<User[]>([])
  const loading = ref(true)
  const error = ref<string | null>(null)
  const totalUsers = ref(0)

  // ===== UI State =====
  const searchQuery = ref('')
  const filters = ref<FilterState>({
    roles: [],
    genders: [],
  })
  const sortField = ref<SortField>('firstName')
  const sortOrder = ref<SortOrder>('asc')
  const pagination = ref<PaginationState>({
    currentPage: 1,
    itemsPerPage: 12,
  })

  // ===== Derived State (computed from Server State + UI State) =====
  const filteredUsers = computed(() => {
    let result = [...users.value]

    // Apply search
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      result = result.filter((user) =>
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.username.toLowerCase().includes(query)
      )
    }

    // Apply role filter
    if (filters.value.roles.length > 0) {
      result = result.filter((user) => filters.value.roles.includes(user.role))
    }

    // Apply gender filter
    if (filters.value.genders.length > 0) {
      result = result.filter((user) => filters.value.genders.includes(user.gender))
    }

    return result
  })

  const sortedUsers = computed(() => {
    const result = [...filteredUsers.value]

    result.sort((a, b) => {
      let aVal = a[sortField.value]
      let bVal = b[sortField.value]

      if (sortField.value === 'firstName') {
        aVal = `${a.firstName} ${a.lastName}`
        bVal = `${b.firstName} ${b.lastName}`
      }

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

  const paginatedUsers = computed(() => {
    const start = (pagination.value.currentPage - 1) * pagination.value.itemsPerPage
    const end = start + pagination.value.itemsPerPage
    return sortedUsers.value.slice(start, end)
  })

  const totalPages = computed(() => {
    return Math.ceil(sortedUsers.value.length / pagination.value.itemsPerPage)
  })

  // ===== Actions =====
  async function fetchUsers() {
    loading.value = true
    error.value = null

    try {
      const response = await api.fetchUsers(200, 0) // Fetch a good amount for client-side operations
      users.value = response.users
      totalUsers.value = response.total
      return response
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch users'
      console.error('Error fetching users:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchUserById(id: number): Promise<User | null> {
    try {
      // Check if user exists in local state first
      const localUser = users.value.find((user) => user.id === id)
      if (localUser) return localUser

      // Otherwise fetch from API
      const user = await api.fetchUser(id)
      return user
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch user'
      console.error('Error fetching user:', err)
      return null
    }
  }

  function addUser(user: Omit<User, 'id'>) {
    // Optimistic update
    const newUser: User = {
      ...user,
      id: Math.max(...users.value.map((user) => user.id), 0) + 1,
    }

    users.value.unshift(newUser)
    
    // In a real app, you would also make an API call here
    // and handle potential failures by reverting the optimistic update
  }

  function updateUser(id: number, updates: Partial<User>) {
    // Optimistic update
    const index = users.value.findIndex((user) => user.id === id)
    if (index !== -1) {
      users.value[index] = {
        ...users.value[index],
        ...updates,
      } as User
    }

    // In a real app, you would also make an API call here
  }

  function deleteUser(id: number) {
    // Optimistic update
    const index = users.value.findIndex((user) => user.id === id)
    if (index !== -1) {
      users.value.splice(index, 1)
    }

    // In a real app, you would also make an API call here
  }

  // ===== URL Sync =====
  function syncFromUrl() {
    if (route.query.page) {
      pagination.value.currentPage = parseInt(route.query.page as string, 10)
    }
    if (route.query.limit) {
      pagination.value.itemsPerPage = parseInt(route.query.limit as string, 10)
    }
    if (route.query.search) {
      searchQuery.value = route.query.search as string
    }
    if (route.query.roles) {
      filters.value.roles = Array.isArray(route.query.roles)
        ? route.query.roles.filter((role): role is string => role !== null)
        : [route.query.roles].filter((role): role is string => role !== null)
    }
    if (route.query.genders) {
      filters.value.genders = Array.isArray(route.query.genders)
        ? route.query.genders.filter((gender): gender is string => gender !== null)
        : [route.query.genders].filter((gender): gender is string => gender !== null)
    }
    if (route.query.sort) {
      sortField.value = route.query.sort as SortField
    }
    if (route.query.order) {
      sortOrder.value = route.query.order as SortOrder
    }
  }

  function syncToUrl() {
    const query: Record<string, string | number | string[]> = {}

    if (pagination.value.currentPage > 1) {
      query.page = pagination.value.currentPage
    }
    if (pagination.value.itemsPerPage !== 12) {
      query.limit = pagination.value.itemsPerPage
    }
    if (searchQuery.value) {
      query.search = searchQuery.value
    }
    if (filters.value.roles.length > 0) {
      query.roles = filters.value.roles
    }
    if (filters.value.genders.length > 0) {
      query.genders = filters.value.genders
    }
    if (sortField.value !== 'firstName') {
      query.sort = sortField.value
    }
    if (sortOrder.value !== 'asc') {
      query.order = sortOrder.value
    }

    router.push({ query })
  }

  // Reset pagination when filters change
  watch([searchQuery, filters], () => {
    pagination.value.currentPage = 1
  }, { deep: true })

  // Watch for changes and sync to URL
  watch(
    [searchQuery, filters, sortField, sortOrder, pagination],
    () => {
      syncToUrl()
    },
    { deep: true }
  )

  return {
    // State
    users,
    loading,
    error,
    totalUsers,
    searchQuery,
    filters,
    sortField,
    sortOrder,
    pagination,

    // Computed
    filteredUsers,
    sortedUsers,
    paginatedUsers,
    totalPages,

    // Actions
    fetchUsers,
    fetchUserById,
    addUser,
    updateUser,
    deleteUser,
    syncFromUrl,
    syncToUrl,
  }
})
