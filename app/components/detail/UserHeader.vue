<template>
  <div class="section animate-slide-up">
    <div class="flex flex-col md:flex-row gap-8 items-start">
      <!-- Large Profile Picture -->
      <div class="flex-shrink-0">
        <button 
          @click="isZoomed = true" 
          class="relative group cursor-zoom-in focus:outline-none"
          aria-label="Zoom profile image"
        >
          <NuxtImg
            :src="user.image"
            :alt="`${user.firstName} ${user.lastName}`"
            class="w-48 h-48 rounded-2xl object-cover border-4 border-slate-200 shadow-lg transition-transform duration-300 group-hover:scale-105"
          />
          <div class="absolute inset-0 rounded-2xl bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
        </button>
      </div>

      <!-- User Info -->
      <div class="flex-1 w-full">
        <div class="flex justify-between items-start">
          <div>
            <h1 class="text-4xl font-bold text-slate-900 mb-2">
              {{ user.firstName }} {{ user.lastName }}
            </h1>
            <p class="text-xl text-slate-600 mb-1">@{{ user.username }}</p>
            <p class="text-lg text-primary-600 font-medium mb-4">{{ user.company.title }}</p>
          </div>

          <!-- Actions -->
          <div class="flex gap-2">
            <button 
              @click="$emit('edit')" 
              class="btn btn-secondary flex items-center gap-2"
            >
              <Icon name="heroicons:pencil-square" class="w-5 h-5" />
              <span class="hidden sm:inline">Edit</span>
            </button>
            <button 
              @click="$emit('delete')" 
              class="btn bg-white border border-red-200 text-red-600 hover:bg-red-50 flex items-center gap-2"
            >
              <Icon name="heroicons:trash" class="w-5 h-5" />
              <span class="hidden sm:inline">Delete</span>
            </button>
          </div>
        </div>

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

    <!-- Image Zoom Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div 
          v-if="isZoomed" 
          class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 cursor-zoom-out"
          @click="isZoomed = false"
        >
          <NuxtImg
            :src="user.image"
            :alt="`${user.firstName} ${user.lastName}`"
            class="max-w-full max-h-[90vh] object-contain rounded-lg animate-scale-in"
          />
          <button 
            class="absolute top-4 right-4 text-white hover:text-gray-300 p-2"
            @click="isZoomed = false"
          >
            <Icon name="heroicons:x-mark" class="w-8 h-8" />
          </button>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import type { User } from '../../types/user'

defineProps<{
  user: User
}>()

defineEmits<{
  edit: []
  delete: []
}>()

const isZoomed = ref(false)
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
