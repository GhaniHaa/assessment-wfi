<template>
  <div class="flex items-center gap-3">
    <span class="text-sm font-medium text-slate-500">Sort by</span>
    <div class="flex items-center gap-2 p-1 bg-slate-100/50 rounded-xl border border-slate-200/50">
      <button
        v-for="option in options"
        :key="option.value"
        @click="handleSort(option.value)"
        class="group relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200"
        :class="[
          field === option.value
            ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50'
        ]"
      >
        <span>{{ option.label }}</span>
        
        <div 
          class="flex flex-col -space-y-1 transition-opacity duration-200"
          :class="field === option.value ? 'opacity-100' : 'opacity-0 group-hover:opacity-30'"
        >
          <Icon
            name="heroicons:chevron-up-20-solid"
            class="w-3 h-3 transition-colors"
            :class="[
              field === option.value && order === 'asc' 
                ? 'text-primary-600' 
                : 'text-slate-400'
            ]"
          />
          <Icon
            name="heroicons:chevron-down-20-solid"
            class="w-3 h-3 transition-colors"
            :class="[
              field === option.value && order === 'desc' 
                ? 'text-primary-600' 
                : 'text-slate-400'
            ]"
          />
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SortField, SortOrder } from '../types/user'

const props = defineProps<{
  field: SortField
  order: SortOrder
}>()

const emit = defineEmits<{
  'update:field': [value: SortField]
  'update:order': [value: SortOrder]
}>()

const options: { label: string; value: SortField }[] = [
  { label: 'Name', value: 'firstName' },
  { label: 'Age', value: 'age' },
  { label: 'Email', value: 'email' },
]

function handleSort(value: SortField) {
  if (props.field === value) {
    emit('update:order', props.order === 'asc' ? 'desc' : 'asc')
  } else {
    emit('update:field', value)
    emit('update:order', 'asc')
  }
}
</script>
