<template>
    <div class="min-h-screen">
      <div class="container mx-auto px-4 py-8">
        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center items-center h-64">
          <div class="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
        </div>
  
        <!-- Content -->
        <template v-else>
          <h1 v-if="destination" class="text-3xl font-bold text-gray-900 mb-8 text-center">
            {{ destination.title }}
          </h1>
  
          <!-- Main Image -->
          <div v-if="destination?.image" class="relative h-[400px] mb-12 rounded-lg overflow-hidden">
            <img
              :src="destination.image"
              :alt="destination.name"
              class="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
  
          <!-- Attractions -->
          <div v-if="attractions?.images?.length" class="mb-12">
            <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">
              Some more places To Visits Here
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div
                v-for="(attraction, index) in attractions.images"
                :key="index"
                class="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  :src="attraction"
                  :alt="`Attraction ${index + 1}`"
                  class="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div class="p-4">
                  <h3 class="text-lg font-semibold mb-2">{{ attractions?.title }}</h3>
                  <p class="text-gray-600 text-sm">{{ attractions?.description }}</p>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Fallback if no data -->
          <div v-else class="text-center text-gray-600">
            No attractions found.
          </div>
        </template>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, watch } from 'vue'
  import { useRoute } from 'vue-router'
  
  const route = useRoute()
  const loading = ref(true)
  const destination = ref<any>(null)
  const attractions = ref<any>(null)
  
  // Fetch destination and attractions
  const fetchData = async () => {
    try {
      loading.value = true
  
      // Fetch destination data
      const { data: destinationData } = await useFetch('/api/destinations', {
        query: { q: route.params.slug }
      })
  
      // Fetch location pictures
      const { data: locationPictures } = await useFetch('/api/locationsPicture', {
        query: { q: route.params.slug }
      })
  
      // Assign data
      if (destinationData.value && destinationData.value.length > 0) {
        destination.value = destinationData.value[0]
      } else {
        destination.value = null
      }
  
      if (locationPictures.value && locationPictures.value.length > 0) {
        attractions.value = locationPictures.value[0]
      } else {
        attractions.value = null
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      loading.value = false
    }
  }
  
  // Fetch data on mount and when the slug changes
  onMounted(fetchData)
  watch(() => route.params.slug, fetchData)
  </script>