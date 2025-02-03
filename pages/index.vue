<template>
  <div class="relative">
    <!-- Hero Section with Search -->
    <div class="relative h-[600px]">
      <img 
        src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDQwMm4yNnN0YTRleXNycTNhZmVnbTBma3UyNmJnMXZmZTEyazBibSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/YSxEHyUtxyduWiGkUg/giphy.gif"
        alt="Travel Background"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-black bg-opacity-50"></div>
      <div class="absolute inset-0 flex items-center justify-center">
          <DestinationSearch />
        </div>

    </div>

    <!-- Popular Destinations -->
    <div class="container mx-auto px-4 py-16">
      <div class="container mx-auto py-16 max-w-screen-">
    <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">Popular Destinations</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 justify-center">
      <div
        v-for="destination in destinations"
        :key="destination.id"
        class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
      >
        <img
          :src="destination.image"
          :alt="destination.name"
          class="w-full h-48 object-cover"
        />
        <div class="p-6 text-center">
          <h3 class="text-xl font-bold text-gray-900 mb-2">{{ destination.name }}</h3>
          <p class="text-gray-600">{{ destination.description }}</p>
        </div>
      </div>
    </div>
  </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import DestinationSearch from '~/components//Home/DestinationSearch.vue';
const searchQuery = ref('')
const loading = ref(false)
const destinations = ref([
  {
    id: 1,
    name: 'Paris',
    slug: 'paris',
    image: '/assets/images/a2.jpg',
    description: 'The City of Light awaits with its iconic architecture and romantic ambiance.'
  },
  {
    id: 2,
    name: 'Dubai',
    slug: 'Dubai',
    image: '/assets/images/a3.jpg',
    description: 'The City of Light awaits with its iconic architecture and romantic ambiance.'
  },
  // Add more destinations...
])

</script>