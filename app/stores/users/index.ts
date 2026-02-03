import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '@/types/user'
import { useUserServer } from './server'
import { useUserClient } from './client'

export const useUserStore = defineStore('users', () => {
  // ===== Core State =====
  const users = ref<User[]>([])
  const loading = ref(true)
  const error = ref<string | null>(null)
  const totalUsers = ref(0) 

  // ===== Server Logic =====
  const server = useUserServer(users, loading, error, totalUsers)

  // ===== Client Logic =====
  const client = useUserClient(users)

  return {
    // State
    users,
    loading,
    error,
    totalUsers,
    
    // Spread exposed methods and state from modules
    ...server,
    ...client,
  }
})
