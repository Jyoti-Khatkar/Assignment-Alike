<template>
    <div class="w-full max-w-md">
      <input
        type="text"
        v-model="searchQuery"
        @input="onInput"
        class="w-full px-6 py-4 text-lg rounded-full border-2 border-white bg-white bg-opacity-20 text-white placeholder-white backdrop-blur-sm focus:outline-none focus:border-indigo-500"
        placeholder="Search destination..."
      />
      <div v-if="destinations.length" class="mt-2 bg-white rounded-lg shadow-lg">
        <div v-for="destination in destinations" :key="destination.id" class="p-2 hover:bg-gray-100 cursor-pointer">
          <NuxtLink :to="`/cities/${destination.title}`" class="flex items-center">
            <img :src="destination.image" alt="Destination" class="w-10 h-10 rounded-full">
            <div class="ml-2">
              <div class="font-bold">{{ destination.title }}</div>
              <div class="text-sm text-gray-600">{{ destination.description }}</div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { debounce } from 'lodash';
  
  const searchQuery = ref('');
  const destinations = ref([]);
  
  const fetchDestinations = async () => {
    const { data } = await useFetch('/api/destinations', {
      query: { q: searchQuery.value }
    });
    destinations.value = data.value;
  };
  
  const debouncedFetchDestinations = debounce(fetchDestinations, 300);
  
  const onInput = () => {
    debouncedFetchDestinations();
  };
  </script>