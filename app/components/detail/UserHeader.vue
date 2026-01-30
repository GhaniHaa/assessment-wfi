<template>
  <div class="section animate-slide-up">
    <div class="flex flex-col md:flex-row gap-8 items-start">
      <!-- Large Profile Picture -->
      <div class="flex-shrink-0">
        <NuxtImg
          :src="user.image"
          :alt="`${user.firstName} ${user.lastName}`"
          class="w-48 h-48 rounded-2xl object-cover border-4 border-slate-200 shadow-lg"
        />
      </div>

      <!-- User Info -->
      <div class="flex-1">
        <h1 class="text-4xl font-bold text-slate-900 mb-2">
          {{ user.firstName }} {{ user.lastName }}
        </h1>
        <p class="text-xl text-slate-600 mb-1">@{{ user.username }}</p>
        <p class="text-lg text-primary-600 font-medium mb-4">{{ user.company.title }}</p>

        <div class="flex flex-wrap gap-3 mt-6">
          <span :class="['badge text-base py-1.5 px-4', `badge-${user.role}`]">
            {{ user.role.toUpperCase() }}
          </span>
          <span class="badge bg-slate-100 text-slate-700 text-base py-1.5 px-4">
            {{ user.gender.charAt(0).toUpperCase() + user.gender.slice(1) }}
          </span>
          <span class="badge bg-slate-100 text-slate-700 text-base py-1.5 px-4">
            {{ user.age }} years old
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from '../../types/user'

defineProps<{
  user: User
}>()
</script>
