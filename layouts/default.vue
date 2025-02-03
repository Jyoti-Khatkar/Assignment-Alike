<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-white shadow-md">
      <nav class="container mx-auto px-4 py-3 flex justify-between items-center">
        <NuxtLink to="/" class="flex items-center space-x-2">
          <img src="/favicon.ico" alt="Smart Travel Planner" class="h-8 w-auto" />
          <span class="text-xl font-bold text-indigo-600">Smart Travel Planner</span>
        </NuxtLink>
        
        <div class="flex items-center space-x-6">
          <NuxtLink 
            to="/itinerary" 
            class="text-gray-700 hover:text-indigo-600 font-medium"
          >
            Itinerary
          </NuxtLink>
          
          <!-- <div class="relative" v-click-outside="closeDropdown">
            <button 
              @click="toggleDropdown" 
              class="flex items-center space-x-2 text-gray-700 hover:text-indigo-600"
            >
              <UserCircleIcon class="h-6 w-6" />
              <ChevronDownIcon class="h-4 w-4" />
            </button>
            
            <div 
              v-if="isDropdownOpen" 
              class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1"
            >
              <template v-if="!isAuthenticated">
                <NuxtLink 
                  to="/auth/signin" 
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
                >
                  Sign In
                </NuxtLink>
                <NuxtLink 
                  to="/auth/register" 
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
                >
                  Register
                </NuxtLink>
              </template>
              <button 
                v-else
                @click="logout" 
                class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
              >
                Logout
              </button>
            </div>
          </div> -->
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
import { UserCircleIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'

const isDropdownOpen = ref(false)
const isAuthenticated = ref(false) // Replace with actual auth state from store

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const closeDropdown = () => {
  isDropdownOpen.value = false
}

const logout = () => {
  // Implement logout logic
  isAuthenticated.value = false
  closeDropdown()
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