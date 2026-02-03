<template>
  <div class="min-h-screen bg-slate-50">
    <UsersPageHeader
      :filtered-count="userStore.filteredUsers.length"
      :total-count="userStore.users.length"
      :has-filters="hasActiveFilters"
      @add-user="showAddUserModal = true"
    />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <UsersControlsPanel
        v-model:search-query="userStore.searchQuery"
        v-model:roles="roleFilter"
        v-model:genders="genderFilter"
        v-model:sort-field="userStore.sortField"
        v-model:sort-order="userStore.sortOrder"
        class="mb-8"
      />
      
      <!-- Error State (Full Page) -->
      <div v-if="userStore.error && userStore.users.length === 0" class="text-center py-20">
        <div class="text-red-600 mb-4">{{ userStore.error }}</div>
        <button class="btn btn-primary" @click="userStore.fetchUsers()">
          Retry
        </button>
      </div>

      <template v-else>
        <!-- Error Banner (Action Failed) -->
        <div v-if="userStore.error" class="bg-red-50 text-red-700 p-4 rounded-lg mb-6 flex justify-between items-center">
          <span>{{ userStore.error }}</span>
          <button @click="userStore.error = null" class="text-sm font-medium hover:underline">Dismiss</button>
        </div>

        <UserList
          :users="userStore.paginatedUsers"
          :is-loading="userStore.loading"
          @edit="handleEditUser"
          @delete="handleDeleteUser"
        />

        <Pagination
          v-if="!userStore.loading && userStore.totalPages > 0"
          v-model:current-page="userStore.pagination.currentPage"
          v-model:items-per-page="userStore.pagination.itemsPerPage"
          :total-pages="userStore.totalPages"
          class="mt-8"
        />
      </template>
    </div>

    <!-- Modals -->
    <UserForm
      v-if="showAddUserModal"
      @close="showAddUserModal = false"
      @save="handleAddUser"
    />

    <UserForm
      v-if="editingUser"
      :user="editingUser"
      @close="editingUser = null"
      @save="handleSaveEdit"
    />

    <ConfirmDialog
      v-if="deletingUserId !== null"
      title="Delete User"
      message="Are you sure you want to delete this user? This action cannot be undone."
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />
  </div>
</template>

<script setup lang="ts">
const {
  userStore,
  showAddUserModal,
  editingUser,
  deletingUserId,
  handleAddUser,
  handleEditUser,
  handleSaveEdit,
  handleDeleteUser,
  confirmDelete,
  cancelDelete,
} = useUserManagement()

const roleFilter = computed({
  get: () => userStore.filters.role || [],
  set: (val: string[]) => { userStore.filters.role = val }
})

const genderFilter = computed({
  get: () => userStore.filters.gender || [],
  set: (val: string[]) => { userStore.filters.gender = val }
})

const hasActiveFilters = computed(() =>
  Boolean(
    userStore.searchQuery ||
    roleFilter.value.length > 0 ||
    genderFilter.value.length > 0
  )
)

useHead({
  title: 'Assessment App',
  meta: [
    { name: 'description', content: 'Assessment App' }
  ]
})
</script>
