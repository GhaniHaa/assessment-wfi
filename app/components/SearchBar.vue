<template>
  <div class="relative">
    <Icon name="heroicons:magnifying-glass" class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
    <input
      :value="modelValue"
      type="text"
      placeholder="Search by name, email, or username..."
      class="input pl-12 text-base"
      @input="handleInput"
    >
    <button
      v-if="modelValue"
      class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 flex items-center"
      @click="modelValue = ''"
    >
      <Icon name="heroicons:x-mark" class="w-5 h-5" />
    </button>
  </div>
</template>

<script setup lang="ts">
const modelValue = defineModel<string>({ required: true })

let debounceTimer: ReturnType<typeof setTimeout>

function handleInput(event: Event) {
  const value = (event.target as HTMLInputElement).value
  
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    modelValue.value = value
  }, 300)
}

onUnmounted(() => {
  clearTimeout(debounceTimer)
})
</script>
