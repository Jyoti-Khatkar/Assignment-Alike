<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-white shadow-md">
      <nav class="container mx-auto px-4 py-3 flex justify-between items-center">
        <!-- <NuxtLink to="/" class="flex items-center space-x-2">
          <img src="/favicon.ico" alt="Smart Travel Planner" class="h-8 w-auto" />
          <span class="text-xl font-bold text-indigo-600">Smart Travel Planner</span>
        </NuxtLink>
        
        <div class="flex items-center space-x-6">
          <NuxtLink 
            to="/itinerary" 
            class="text-gray-700 hover:text-indigo-600 font-medium"
          >
            Itinerary
          </NuxtLink> -->

          <!-- <NuxtLink to="/" class="text-xl font-bold">Logo</NuxtLink> -->
       <NuxtLink to="/" class="flex items-center space-x-2">
          <img src="/favicon.ico" alt="Smart Travel Planner" class="h-8 w-auto" />
          <span class="text-xl font-bold text-indigo-600">Smart Travel Planner</span>
        </NuxtLink>
      
      <div class="flex items-center gap-4">
        <NuxtLink 
            to="/itinerary" 
            class="text-gray-700 hover:text-indigo-600 font-medium"
          >
            Itinerary
          </NuxtLink>
        
        <div v-if="isAuthenticated" class="relative group">
            <button @click="handleLogout" class="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100">
              Logout
            </button>
        </div>
        
        <template v-else>
          <NuxtLink to="/auth/login" class="hover:text-gray-300">Login</NuxtLink>
          <NuxtLink to="/auth/register" class="hover:text-gray-300">Register</NuxtLink>
        </template>
      </div>
      </nav>
    </header>

    <main class="flex-grow">
      <slot />
    </main>

    <footer class="bg-gray-900 text-white py-12">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 class="text-xl font-bold mb-4">Discover the World</h3>
            <p class="text-gray-300">
              Embark on unforgettable journeys with Smart Travel Planner. 
              We help you create memories that last a lifetime.
            </p>
          </div>
          <div>
            <h3 class="text-xl font-bold mb-4">Popular Destinations</h3>
            <ul class="space-y-2 text-gray-300">
              <li>Paris, France</li>
              <li>Tokyo, Japan</li>
              <li>New York, USA</li>
              <li>Rome, Italy</li>
            </ul>
          </div>
          <div>
            <h3 class="text-xl font-bold mb-4">Travel Tips</h3>
            <ul class="space-y-2 text-gray-300">
              <li>Best Time to Travel</li>
              <li>Packing Essentials</li>
              <li>Travel Insurance</li>
              <li>Local Customs</li>
            </ul>
          </div>
        </div>
        <div class="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {{ new Date().getFullYear() }} Smart Travel Planner. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {useAuth} from '~/composables/useAuth'
import { UserCircleIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'

const { isAuthenticated, logout } = useAuth()
const router = useRouter()

const isDropdownOpen = ref(false)

const handleLogout = () => {
  logout();
  router.push('/auth/login');
}

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
}

const closeDropdown = () => {
  isDropdownOpen.value = false;
}
</script>




<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>