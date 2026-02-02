<template>
  <div class="section animate-fade-in">
    <h2 class="section-title">Finance & Technology</h2>
    
    <div class="space-y-4">
      <!-- Bank Card -->
      <div>
        <h3 class="text-sm font-semibold text-slate-700 mb-2">Bank Card</h3>
        <div class="space-y-1 text-sm">
          <div class="flex justify-between">
            <span class="text-slate-600">Card Number</span>
            <span class="font-mono text-slate-900">{{ user.bank?.cardNumber ? "•••• " + user.bank?.cardNumber?.slice(-4) : '-' }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-600">Card Type</span>
            <span class="text-slate-900 capitalize">{{ user.bank?.cardType || '-' }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-600">Expires</span>
            <span class="text-slate-900">{{ user.bank?.cardExpire || '-' }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-600">Currency</span>
            <span class="text-slate-900">{{ user.bank?.currency || '-' }}</span>
          </div>
        </div>
      </div>

      <!-- Crypto -->
      <div>
        <h3 class="text-sm font-semibold text-slate-700 mb-2">Cryptocurrency</h3>
        <div class="space-y-1 text-sm">
          <div class="flex justify-between">
            <span class="text-slate-600">Coin</span>
            <span class="text-slate-900">{{ user.crypto?.coin || '-' }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-600">Network</span>
            <span class="text-slate-900">{{ user.crypto?.network || '-' }}</span>
          </div>
          <div>
            <span class="text-slate-600 block mb-1">Wallet</span>
            <span class="font-mono text-xs text-slate-900 break-all">{{ user.crypto?.wallet || '-' }}</span>
          </div>
        </div>
      </div>

      <!-- Network Info -->
      <div>
        <h3 class="text-sm font-semibold text-slate-700 mb-2">Network Information</h3>
        <div class="space-y-1 text-sm">
          <div class="flex justify-between">
            <span class="text-slate-600">IP Address</span>
            <span class="font-mono text-slate-900">{{ user.ip || '-' }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-600">MAC Address</span>
            <span class="font-mono text-slate-900">{{ user.macAddress || '-' }}</span>
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
