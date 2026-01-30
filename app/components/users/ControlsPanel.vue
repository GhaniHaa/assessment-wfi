<template>
  <div class="space-y-4">
    <div class="flex flex-col sm:flex-row gap-4">
    <SearchBar v-model="searchQuery" class="flex-1" />
    
    <SortControls
      v-model:field="sortField"
      v-model:order="sortOrder"
    />
    </div>
    
    <FilterControls
      v-model:roles="roles"
      v-model:genders="genders"
    />
  </div>
</template>

<script setup lang="ts">
import type { SortField, SortOrder } from '../../types/user'

const searchQuery = defineModel<string>('searchQuery', { required: true })
const roles = defineModel<string[]>('roles', { required: true })
const genders = defineModel<string[]>('genders', { required: true })
const sortField = defineModel<SortField>('sortField', { required: true })
const sortOrder = defineModel<SortOrder>('sortOrder', { required: true })
</script>
