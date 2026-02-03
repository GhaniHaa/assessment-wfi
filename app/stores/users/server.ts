import type { Ref } from 'vue'
import type { User } from '@/types/user'
import { useApi } from '@/composables/useApi'

export const useUserServer = (users: Ref<User[]>, loading: Ref<boolean>, error: Ref<string | null>, totalUsers: Ref<number>) => {
  const api = useApi()

  async function fetchUsers() {
    loading.value = true
    error.value = null

    try {
      const response = await api.fetchUsers(200, 0)
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
      const localUser = users.value.find((user) => user.id === id)
      if (localUser) return localUser

      const user = await api.fetchUser(id)
      return user
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch user'
      console.error('Error fetching user:', err)
      return null
    }
  }

  async function addUser(user: Omit<User, 'id'>) {
    try {
      const response = await api.addUser(user)
      users.value.unshift(response)
      return response
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to add user'
      console.error('Error adding user:', err)
    }
  }

  async function updateUser(id: number, updates: Partial<User>) {
     try {
      const updatedUser = await api.updateUser(id, updates)
      const index = users.value.findIndex((user) => user.id === id)
      if (index !== -1) {
        users.value[index] = {
          ...users.value[index],
          ...updatedUser,
        } as User
      }
      return updatedUser
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to edit user'
      console.error('Error edit user:', err)
      return null
    }
  }

  async function deleteUser(id: number) {
    const index = users.value.findIndex((user) => user.id === id)
    if (index === -1) return false

    const deletedUser = users.value[index]
    if (!deletedUser) return false

    users.value.splice(index, 1)

    try {
      await api.deleteUser(id)
      return true
    } catch (err) {
      users.value.splice(index, 0, deletedUser)
      
      error.value = err instanceof Error ? err.message : 'Failed to delete user'
      console.error('Error deleting user:', err)
      return false
    }
  }

  return {
    fetchUsers,
    fetchUserById,
    addUser,
    updateUser,
    deleteUser
  }
}
