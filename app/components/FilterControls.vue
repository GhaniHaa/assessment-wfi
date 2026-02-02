<template>
  <div class="flex flex-wrap gap-4">
    <!-- Role Filter -->
    <div class="flex-1 min-w-[200px]">
      <label class="block text-sm font-medium text-slate-700 mb-2">Role</label>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="role in availableRoles"
          :key="role"
          :class="[
            'badge cursor-pointer border-2 transition-all',
            roles.includes(role)
              ? `badge-${role.toLowerCase()} border-current`
              : 'bg-slate-100 text-slate-600 border-transparent hover:border-slate-300'
          ]"
          @click="toggleRole(role)"
        >
          {{ role.toUpperCase() }}
        </button>
      </div>
    </div>

    <!-- Gender Filter -->
    <div class="flex-1 min-w-[200px]">
      <label class="block text-sm font-medium text-slate-700 mb-2">Gender</label>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="gender in availableGenders"
          :key="gender"
          :class="[
            'badge cursor-pointer border-2 transition-all capitalize',
            genders.includes(gender)
              ? 'bg-primary-100 text-primary-800 border-primary-300'
              : 'bg-slate-100 text-slate-600 border-transparent hover:border-slate-300'
          ]"
          @click="toggleGender(gender)"
        >
          {{ gender }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  roles: string[]
  genders: string[]
}>()

const emit = defineEmits<{
  'update:roles': [value: string[]]
  'update:genders': [value: string[]]
}>()

const availableRoles = ['admin', 'moderator', 'user']
const availableGenders = ['male', 'female']

function toggleRole(role: string) {
  const newRoles = props.roles.includes(role)
    ? props.roles.filter(r => r !== role)
    : [...props.roles, role]
  emit('update:roles', newRoles)
}

function toggleGender(gender: string) {
  const newGenders = props.genders.includes(gender)
    ? props.genders.filter(g => g !== gender)
    : [...props.genders, gender]
  emit('update:genders', newGenders)
}
</script>
