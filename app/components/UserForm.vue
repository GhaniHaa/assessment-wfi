<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/50" @click="$emit('close')"></div>

        <!-- Modal -->
        <div class="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
          <!-- Header -->
          <div class="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
            <h2 class="text-2xl font-bold text-slate-900">
              {{ user ? 'Edit User' : 'Add New User' }}
            </h2>
            <button @click="$emit('close')" class="text-slate-400 hover:text-slate-600">
              <Icon name="heroicons:x-mark" class="w-6 h-6" />
            </button>
          </div>

          <!-- Form -->
          <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
            <!-- Basic Info -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-2">First Name *</label>
                <input v-model="formData.firstName" type="text" required class="input" />
                <p v-if="errors['firstName']" class="text-red-600 text-sm mt-1">{{ errors['firstName'] }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-2">Last Name *</label>
                <input v-model="formData.lastName" type="text" required class="input" />
                <p v-if="errors['lastName']" class="text-red-600 text-sm mt-1">{{ errors['lastName'] }}</p>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-2">Username *</label>
                <input v-model="formData.username" type="text" required class="input" />
                <p v-if="errors['username']" class="text-red-600 text-sm mt-1">{{ errors['username'] }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-2">Email *</label>
                <input v-model="formData.email" type="email" required class="input" />
                <p v-if="errors['email']" class="text-red-600 text-sm mt-1">{{ errors['email'] }}</p>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-2">Phone *</label>
                <input v-model="formData.phone" type="tel" required class="input" />
                <p v-if="errors['phone']" class="text-red-600 text-sm mt-1">{{ errors['phone'] }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-2">Birth Date *</label>
                <input v-model="formData.birthDate" type="date" required class="input" />
                <p v-if="errors['birthDate']" class="text-red-600 text-sm mt-1">{{ errors['birthDate'] }}</p>
              </div>
            </div>

            <div class="grid grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-2">Gender *</label>
                <select v-model="formData.gender" required class="input">
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <p v-if="errors['gender']" class="text-red-600 text-sm mt-1">{{ errors['gender'] }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-2">Role *</label>
                <select v-model="formData.role" required class="input">
                  <option value="user">User</option>
                  <option value="moderator">Moderator</option>
                  <option value="admin">Admin</option>
                </select>
                <p v-if="errors['role']" class="text-red-600 text-sm mt-1">{{ errors['role'] }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-2">Age *</label>
                <input v-model.number="formData.age" type="number" min="1" max="120" required class="input" />
                <p v-if="errors['age']" class="text-red-600 text-sm mt-1">{{ errors['age'] }}</p>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">Profile Image URL</label>
              <input v-model="formData.image" type="url" class="input" placeholder="https://..." />
              <p v-if="errors['image']" class="text-red-600 text-sm mt-1">{{ errors['image'] }}</p>
            </div>

            <!-- Company Info -->
            <div class="border-t border-slate-200 pt-4">
              <h3 class="font-semibold text-slate-900 mb-4">Company Information</h3>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-2">Job Title</label>
                  <input v-model="formData.company.title" type="text" class="input" />
                  <p v-if="errors['company.title']" class="text-red-600 text-sm mt-1">{{ errors['company.title'] }}</p>
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-slate-700 mb-2">Company Name</label>
                    <input v-model="formData.company.name" type="text" class="input" />
                    <p v-if="errors['company.name']" class="text-red-600 text-sm mt-1">{{ errors['company.name'] }}</p>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-slate-700 mb-2">Department</label>
                    <input v-model="formData.company.department" type="text" class="input" />
                    <p v-if="errors['company.department']" class="text-red-600 text-sm mt-1">{{ errors['company.department'] }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Submit Buttons -->
            <div class="flex justify-end gap-3 pt-4 border-t border-slate-200">
              <button type="button" @click="$emit('close')" class="btn btn-secondary">
                Cancel
              </button>
              <button type="submit" class="btn btn-primary">
                {{ user ? 'Update User' : 'Add User' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { z } from 'zod'
import type { User } from '../types/user'

const props = defineProps<{
  user?: User
}>()

const emit = defineEmits<{
  close: []
  save: [user: Partial<User>]
}>()

const show = ref(true)

// Initialize form data
const formData = reactive({
  firstName: props.user?.firstName || '',
  lastName: props.user?.lastName || '',
  username: props.user?.username || '',
  email: props.user?.email || '',
  phone: props.user?.phone || '',
  birthDate: props.user?.birthDate || '',
  age: props.user?.age || 20,
  gender: props.user?.gender || 'male' as 'male' | 'female',
  role: props.user?.role || 'user' as 'admin' | 'moderator' | 'user',
  image: props.user?.image || 'https://robohash.org/placeholder.png',
  company: {
    title: props.user?.company?.title || '',
    name: props.user?.company?.name || '',
    department: props.user?.company?.department || '',
  },
})

// Validation Schema
const userSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(5, 'Please enter a valid phone number'),
  birthDate: z.string().min(1, 'Birth date is required'),
  age: z.number().min(1, 'Age must be at least 1').max(120, 'Age must be less than 120'),
  gender: z.enum(['male', 'female'], { message: 'Gender is required' }),
  role: z.enum(['admin', 'moderator', 'user'], { message: 'Role is required' }),
  image: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  company: z.object({
    title: z.string().optional(),
    name: z.string().optional(),
    department: z.string().optional(),
  }).optional(),
})

const errors = ref<Record<string, string>>({})

function handleSubmit() {
  // Clear previous errors
  errors.value = {}

  const result = userSchema.safeParse(formData)

  if (!result.success) {
    result.error.issues.forEach((issue) => {
      const path = issue.path.join('.')
      errors.value[path] = issue.message
    })
    return
  }

  // Default values for user. These values are not required for the user, but they are required for the user object.
  // Because when we fill it manually it will take too much time.
  const defaultAddress = {
    address: '123 Innovation Dr',
    city: 'Tech City',
    state: 'CA',
    stateCode: 'CA',
    postalCode: '94043',
    coordinates: { lat: 37.422, lng: -122.084 },
    country: 'USA'
  }
  const defaults = {
    maidenName: 'N/A',
    password: 'password123',
    bloodGroup: 'O+',
    height: 175,
    weight: 70,
    eyeColor: 'Brown',
    hair: { color: 'Black', type: 'Straight' },
    ip: '192.168.1.1',
    address: defaultAddress,
    macAddress: '00:00:00:00:00:00',
    university: 'Tech University',
    bank: {
      cardExpire: '12/28',
      cardNumber: '4532123456789012',
      cardType: 'Visa',
      currency: 'USD',
      iban: 'US12345678901234567890'
    },
    ein: '12-3456789',
    ssn: '123-45-6789',
    userAgent: 'Mozilla/5.0 (Modern Browser)',
    crypto: {
      coin: 'Bitcoin',
      wallet: '0x123...abc',
      network: 'Ethereum'
    }
  }

  const formCompanyData = result.data.company || {}
  const mergedCompany = {
    department: formCompanyData.department || props.user?.company?.department || 'Engineering',
    name: formCompanyData.name || props.user?.company?.name || 'Acme Corp',
    title: formCompanyData.title || props.user?.company?.title || 'Developer',
    address: props.user?.company?.address || defaultAddress
  }

  const finalUser = {
    ...defaults,
    ...props.user,
    ...result.data,
    company: mergedCompany,
    // Ensure nested objects from defaults are used if missing in props.user
    hair: props.user?.hair || defaults.hair,
    address: props.user?.address || defaults.address,
    bank: props.user?.bank || defaults.bank,
    crypto: props.user?.crypto || defaults.crypto
  }

  emit('save', finalUser as User)
  emit('close')
}
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
