import type { User } from '../types/user'

export const useUserManagement = () => {
  const userStore = useUserStore()
  const showAddUserModal = ref(false)
  const editingUser = ref<User | null>(null)
  const deletingUserId = ref<number | null>(null)

  // Initialize: Sync state from URL and fetch data if needed
  const initialize = async () => {
    userStore.syncFromUrl()
    // Only fetch if we don't have users yet
    if (userStore.users.length === 0) {
      await userStore.fetchUsers()
    }
  }

  // Auto-initialize on mount
  onMounted(initialize)

  // CRUD handlers
  const handleAddUser = (user: Partial<User>) => {
    userStore.addUser(user as Omit<User, 'id'>)
    showAddUserModal.value = false
  }

  const handleEditUser = (user: User) => {
    editingUser.value = { ...user }
  }

  const handleSaveEdit = (updates: Partial<User>) => {
    if (editingUser.value) {
      userStore.updateUser(editingUser.value.id, updates)
      editingUser.value = null
    }
  }

  const handleDeleteUser = (id: number) => {
    deletingUserId.value = id
  }

  const confirmDelete = () => {
    if (deletingUserId.value !== null) {
      userStore.deleteUser(deletingUserId.value)
      deletingUserId.value = null
    }
  }

  const cancelDelete = () => {
    deletingUserId.value = null
  }

  return {
    userStore,
    showAddUserModal,
    editingUser,
    deletingUserId,
    initialize,
    handleAddUser,
    handleEditUser,
    handleSaveEdit,
    handleDeleteUser,
    confirmDelete,
    cancelDelete,
  }
}
