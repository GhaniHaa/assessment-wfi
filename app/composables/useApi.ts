import type { UsersApiResponse, User } from '../types/user'

// Simple API client wrapper
export const useApi = () => {
  const config = useRuntimeConfig()
  const API_BASE = config.public.apiBase

  return {
    // Fetch all users
    async fetchUsers(limit = 30, skip = 0): Promise<UsersApiResponse> {
      return $fetch<UsersApiResponse>(`${API_BASE}/users`, {
        params: { limit, skip },
      })
    },

    // Fetch single user
    async fetchUser(id: number): Promise<User> {
      return $fetch<User>(`${API_BASE}/users/${id}`)
    },

    // Search users
    async searchUsers(query: string): Promise<UsersApiResponse> {
      return $fetch<UsersApiResponse>(`${API_BASE}/users/search`, {
        params: { q: query },
      })
    },

    // Update users
    async updateUser(id: number, user: Partial<User>): Promise<User> {
      return $fetch<User>(`${API_BASE}/users/${id}`, {
        method: 'PUT',
        body: user,
      })
    },

    // Delete user
    async deleteUser(id: number): Promise<void> {
      return $fetch<void>(`${API_BASE}/users/${id}`, {
        method: 'DELETE',
      })
    },

    // Add user
    async addUser(user: Partial<User>): Promise<User> {
      return $fetch<User>(`${API_BASE}/users/add`, {
        method: 'POST',
        body: user,
      })
    },
  }
}
