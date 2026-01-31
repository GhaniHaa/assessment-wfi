<template>
  <div class="min-h-screen bg-slate-50">
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center min-h-screen">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="!user" class="flex flex-col justify-center items-center min-h-screen">
      <p class="text-red-600 text-xl mb-4">User not found</p>
      <NuxtLink to="/" class="btn btn-primary">Back to Users</NuxtLink>
    </div>

    <!-- User Detail -->
    <div v-else class="pb-12">
      <!-- Back Button -->
      <div class="bg-white border-b border-slate-200">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <NuxtLink to="/" class="inline-flex items-center text-slate-600 hover:text-slate-900">
            <Icon name="heroicons:arrow-left" class="w-5 h-5 mr-2" />
            Back to Users
          </NuxtLink>
        </div>
      </div>

      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <!-- Header -->
        <DetailUserHeader :user="user" class="mb-8" />

        <!-- Content Sections -->
        <div class="grid gap-6 md:grid-cols-2">
          <DetailPersonalStats :user="user" />
          <DetailLocationInfo :user="user" />
          <DetailEmploymentInfo :user="user" />
          <DetailFinanceInfo :user="user" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const userStore = useUserStore()
const router = useRouter()

const userId = computed(() => parseInt(route.params.id as string, 10))
const { data: user, status } = await useAsyncData(
  `user-${route.params.id}`,
  async () => {
    // Get from endpoint fetch
    const api = useApi()
    return await api.fetchUser(userId.value)
  },
  {
    getCachedData: (key) => {
      // 1. Check Pinia Store (Fastest, most up-to-date from list)
      const localUser = userStore.users.find(u => u.id === userId.value)
      if (localUser) {
        return JSON.parse(JSON.stringify(localUser))
      }

      // 2. Check Nuxt Payload Cache (Standard behavior)
      const nuxtApp = useNuxtApp()
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
    }
  }
)
onMounted(() => {
  if (!user.value) {
    router.push('/')
  }
})

const loading = computed(() => status.value === 'pending')

// Update page title
useHead({
  title: computed(() => user.value ? `${user.value.firstName} ${user.value.lastName}` : 'User Details'),
})
</script>
