<template>
  <div>
    <!-- Loading State -->
    <div v-if="users.length === 0 && isLoading" class="text-center py-20">
      <Icon name="heroicons:spinner" class="w-16 h-16 mx-auto text-slate-300 mb-4 animate-spin" />
      <p class="text-slate-600 text-lg">Loading users...</p>
      <p class="text-slate-400 text-sm mt-2">Please wait while we load the users</p>
    </div>    

    <!-- Empty State -->
    <div v-if="users.length === 0 && !isLoading" class="text-center py-20">
      <Icon name="heroicons:users" class="w-16 h-16 mx-auto text-slate-300 mb-4" />
      <p class="text-slate-600 text-lg">No users found</p>
      <p class="text-slate-400 text-sm mt-2">Try adjusting your filters or search query</p>
    </div>

    <!-- User Grid -->
    <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <UserCard
        v-for="(user, index) in users"
        :key="user.id"
        :user="user"
        :loading="index < 6 ? 'eager' : 'lazy'"
        @edit="handleEdit"
        @delete="handleDelete"
      />
    </div>

    <!-- Edit Modal -->
    <UserForm
      v-if="editingUser"
      :user="editingUser"
      @close="editingUser = null"
      @save="handleSaveEdit"
    />

    <!-- Delete Confirmation -->
    <ConfirmDialog
      v-if="deletingUserId !== null"
      title="Delete User"
      message="Are you sure you want to delete this user? This action cannot be undone."
      @confirm="confirmDelete"
      @cancel="deletingUserId = null"
    />
  </div>
</template>

<script setup lang="ts">
import type { User } from '../types/user'

defineProps<{
  users: User[]
  isLoading: boolean
}>()

const userStore = useUserStore()
const editingUser = ref<User | null>(null)
const deletingUserId = ref<number | null>(null)

function handleEdit(user: User) {
  editingUser.value = { ...user }
}

function handleSaveEdit(updates: Partial<User>) {
  if (editingUser.value) {
    userStore.updateUser(editingUser.value.id, updates)
    editingUser.value = null
  }
}

function handleDelete(id: number) {
  deletingUserId.value = id
}

function confirmDelete() {
  if (deletingUserId.value !== null) {
    userStore.deleteUser(deletingUserId.value)
    deletingUserId.value = null
  }
}
</script>
