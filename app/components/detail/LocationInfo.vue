<template>
  <div class="section animate-fade-in">
    <h2 class="section-title">Location</h2>
    
    <div class="space-y-4">
      <!-- Address -->
      <div>
        <h3 class="text-sm font-semibold text-slate-700 mb-2">Home Address</h3>
        <div class="text-slate-600 space-y-1">
          <p>{{ user.address?.address || '-' }}</p>
          <p v-if="user.address">{{ user.address?.city }}, {{ user.address?.state }} {{ user.address?.postalCode || '-' }}</p>
          <p v-if="user.address">{{ user.address?.country || '-' }}</p>
        </div>
      </div>

      <!-- Coordinates -->
      <div>
        <h3 class="text-sm font-semibold text-slate-700 mb-2">Coordinates</h3>
        <div class="flex gap-4 text-sm">
          <div>
            <span class="text-slate-600">Latitude:</span>
            <span class="font-medium text-slate-900 ml-2">{{ user.address?.coordinates?.lat || '-' }}</span>
          </div>
          <div>
            <span class="text-slate-600">Longitude:</span>
            <span class="font-medium text-slate-900 ml-2">{{ user.address?.coordinates?.lng || '-' }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from '../../types/user'

const { user } = defineProps<{
  user: User
}>()
</script>
