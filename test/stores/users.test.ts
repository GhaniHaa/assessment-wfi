import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

// Mock the router and route
global.useRouter = () => ({
  push: () => {},
})

global.useRoute = () => ({
  query: {},
})

// Mock the API
global.useApi = () => ({
  fetchUsers: async () => ({
    users: [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        age: 30,
        role: 'admin',
        gender: 'male',
      },
    ],
    total: 1,
    skip: 0,
    limit: 30,
  }),
  fetchUser: async (id: number) => ({
    id,
    firstName: 'John',
    lastName: 'Doe',
  }),
})

describe('User Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('initializes with default state', () => {
    const store = useUserStore()
    expect(store.users).toEqual([])
    expect(store.loading).toBe(true)
    expect(store.searchQuery).toBe('')
    expect(store.pagination.currentPage).toBe(1)
  })

  it('adds a user with optimistic update', () => {
    const store = useUserStore()
    const newUser = {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      age: 25,
      role: 'user' as const,
      gender: 'female' as const,
    }

    store.addUser(newUser)
    expect(store.users.length).toBe(1)
    expect(store.users[0].firstName).toBe('Jane')
  })

  it('updates a user', () => {
    const store = useUserStore()
    store.users = [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
      } as any,
    ]

    store.updateUser(1, { firstName: 'Johnny' })
    expect(store.users[0].firstName).toBe('Johnny')
  })

  it('deletes a user', () => {
    const store = useUserStore()
    store.users = [{ id: 1 } as any, { id: 2 } as any]

    store.deleteUser(1)
    expect(store.users.length).toBe(1)
    expect(store.users[0].id).toBe(2)
  })

  it('filters users by search query', () => {
    const store = useUserStore()
    store.users = [
      { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', username: 'johnd' } as any,
      { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', username: 'janes' } as any,
    ]

    store.searchQuery = 'jane'
    expect(store.filteredUsers.length).toBe(1)
    expect(store.filteredUsers[0].firstName).toBe('Jane')
  })

  it('filters users by role', () => {
    const store = useUserStore()
    store.users = [
      { id: 1, role: 'admin' } as any,
      { id: 2, role: 'user' } as any,
    ]

    store.filters.roles = ['admin']
    expect(store.filteredUsers.length).toBe(1)
    expect(store.filteredUsers[0].role).toBe('admin')
  })

  it('sorts users correctly', () => {
    const store = useUserStore()
    store.users = [
      { id: 1, firstName: 'Zara', lastName: 'Adams', age: 30 } as any,
      { id: 2, firstName: 'Alice', lastName: 'Brown', age: 25 } as any,
    ]

    store.sortField = 'firstName'
    store.sortOrder = 'asc'
    expect(store.sortedUsers[0].firstName).toBe('Alice')

    store.sortOrder = 'desc'
    expect(store.sortedUsers[0].firstName).toBe('Zara')
  })

  it('paginates users correctly', () => {
    const store = useUserStore()
    store.users = Array.from({ length: 30 }, (_, i) => ({ id: i + 1 } as any))

    store.pagination.itemsPerPage = 12
    store.pagination.currentPage = 1
    expect(store.paginatedUsers.length).toBe(12)

    store.pagination.currentPage = 2
    expect(store.paginatedUsers.length).toBe(12)

    store.pagination.currentPage = 3
    expect(store.paginatedUsers.length).toBe(6)
  })
})
