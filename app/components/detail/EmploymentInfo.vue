<template>
  <div class="section animate-fade-in">
    <h2 class="section-title">Employment & Education</h2>
    
    <div class="space-y-4">
      <!-- Company -->
      <div>
        <h3 class="text-sm font-semibold text-slate-700 mb-2">Company</h3>
        <div class="space-y-1">
          <p class="font-medium text-slate-900">{{ user.company?.name || '-' }}</p>
          <p v-if="user.company?.department" class="text-slate-600">{{ user.company.department }}</p>
        </div>
      </div>

      <!-- Office Address -->
      <div>
        <h3 class="text-sm font-semibold text-slate-700 mb-2">Office Address</h3>
        <div class="text-slate-600 space-y-1">
          <p>{{ user.company.address?.address || '-' }}</p>
          <p v-if="user.company.address">{{ user.company.address?.city }}, {{ user.company.address?.state }} {{ user.company.address?.postalCode || '-' }}</p>
          <p v-if="user.company.address">{{ user.company.address?.country || '-' }}</p>
        </div>
      </div>

      <!-- University -->
      <div>
        <h3 class="text-sm font-semibold text-slate-700 mb-2">Education</h3>
        <p class="text-slate-900 font-medium">{{ user.university || '-' }}</p>
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
