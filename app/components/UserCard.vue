<template>
  <div class="card p-6 animate-fade-in hover:scale-[1.02] transition-transform">
    <!-- Header with ID and Actions -->
    <div class="flex items-start justify-between mb-4">
      <div class="flex items-center gap-3">
        <NuxtImg
          :src="user.image"
          :alt="`${user.firstName} ${user.lastName}`"
          class="w-16 h-16 rounded-full object-cover border-2 border-slate-200"
          width="64"
          height="64"
          format="webp"
          :loading="loading"
          :preload="loading === 'eager'"
        />
        <div>
          <NuxtLink
            :to="`/users/${user.id}`"
            class="text-lg font-semibold text-slate-900 hover:text-primary-600 transition-colors"
          >
            {{ user.firstName }} {{ user.lastName }}
          </NuxtLink>
          <p class="text-sm text-slate-500">ID: {{ user.id }}</p>
        </div>
      </div>

      <div class="flex gap-2">
        <NuxtLink
          :to="`/users/${user.id}`"
          class="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          title="View Details"
        >
          <Icon name="heroicons:eye" class="w-4 h-4" />
        </NuxtLink>
        <button
          class="p-2 text-slate-600 hover:text-primary-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          title="Edit"
          @click="emit('edit', user)"
        >
          <Icon name="heroicons:pencil" class="w-4 h-4" />
        </button>
        <button
          class="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
          title="Delete"
          @click="emit('delete', user.id)"
        >
          <Icon name="heroicons:trash" class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Demographics -->
    <div class="space-y-2 mb-4">
      <div class="flex items-center gap-2 text-sm">
        <Icon name="heroicons:cake" class="w-4 h-4 text-slate-400" />
        <span class="text-slate-600">{{ formatDate(user.birthDate) }}</span>
        <span class="text-slate-400">•</span>
        <span class="text-slate-600">{{ user.age }} years old</span>
      </div>
      <div class="flex items-center gap-2 text-sm">
        <Icon :name="user.gender === 'male' ? 'heroicons:user' : 'heroicons:user'" class="w-4 h-4 text-slate-400" />
        <span class="text-slate-600 capitalize">{{ user.gender }}</span>
      </div>
    </div>

    <!-- Role Badge -->
    <div class="mb-4">
      <span :class="['badge', `badge-${user.role.toLowerCase()}`]">
        {{ user.role.toUpperCase() }}
      </span>
    </div>

    <!-- Contact -->
    <div class="space-y-2 pt-4 border-t border-slate-200">
      <div class="flex items-center gap-2 text-sm">
        <Icon name="heroicons:envelope" class="w-4 h-4 text-slate-400" />
        <a :href="`mailto:${user.email}`" class="text-primary-600 hover:underline truncate">
          {{ user.email }}
        </a>
      </div>
      <div class="flex items-center gap-2 text-sm">
        <Icon name="heroicons:phone" class="w-4 h-4 text-slate-400" />
        <a :href="`tel:${user.phone}`" class="text-slate-600 hover:text-primary-600">
          {{ user.phone }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from '../types/user'

const { user, loading = 'lazy' } = defineProps<{
  user: User
  loading?: 'lazy' | 'eager'
}>()

const emit = defineEmits<{
  edit: [user: User]
  delete: [id: number]
}>()

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>
