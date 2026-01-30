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
  }
}
