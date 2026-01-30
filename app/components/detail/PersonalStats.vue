<template>
  <div class="section animate-fade-in">
    <h2 class="section-title">Personal Statistics</h2>
    
    <div class="grid grid-cols-2 gap-4">
      <!-- Physical Attributes -->
      <div class="col-span-2">
        <h3 class="text-sm font-semibold text-slate-700 mb-3">Physical Attributes</h3>
        <div class="space-y-2">
          <div class="flex justify-between">
            <span class="text-slate-600">Height</span>
            <span class="font-medium text-slate-900">{{ user?.height ? user.height + ' cm' : '-' }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-600">Weight</span>
            <span class="font-medium text-slate-900">{{ user?.weight ? user.weight + ' kg' : '-' }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-600">Blood Group</span>
            <span class="font-medium text-slate-900">{{ user?.bloodGroup || '-' }}</span>
          </div>
        </div>
      </div>

      <!-- Appearance -->
      <div class="col-span-2">
        <h3 class="text-sm font-semibold text-slate-700 mb-3 mt-4">Appearance</h3>
        <div class="space-y-2">
          <div class="flex justify-between">
            <span class="text-slate-600">Eye Color</span>
            <span class="font-medium text-slate-900 capitalize">{{ user?.eyeColor || '-' }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-600">Hair Color</span>
            <span class="font-medium text-slate-900 capitalize">{{ user?.hair?.color || '-' }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-600">Hair Type</span>
            <span class="font-medium text-slate-900 capitalize">{{ user.hair?.type || '-' }}</span>
          </div>
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
