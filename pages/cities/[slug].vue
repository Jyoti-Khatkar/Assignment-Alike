<template>
    <div class="min-h-screen">
      <div class="container mx-auto px-4 py-8">
        <div v-if="loading" class="flex justify-center items-center h-64 ">
          <div class="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
        </div>
  
        <template v-else>
          <h1 class="text-3xl font-bold text-gray-900 mb-8 text-center">{{ destination.title }}</h1>
          
          <div class="relative h-[400px] mb-12 rounded-lg overflow-hidden">
            <img
              :src="destination?.image"
              :alt="destination?.name"
              class="w-full h-full object-cover"
            />
          </div>
  
          <div class="mb-12">
            <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">
              Some more places To Visits Here
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div
                v-for="attraction in attractions?.images"
                :key="attraction.id"
                class="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  :src="attraction"
                  :alt="images"
                  class="w-full h-48 object-cover"
                />
                <div class="p-4">
                  <h3 class="text-lg font-semibold mb-2">{{ attractions?.title }}</h3>
                  <p class="text-gray-600 text-sm">{{ attractions?.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, watch } from 'vue'
  import { useRoute } from 'vue-router'
  import { useFetch } from '#app'
  
  const route = useRoute()
  const loading = ref(true)
  const destination = ref<any>(null)
  const attractions = ref<any[]>([])
  
  // Fetch destination based on the city in URL
  const fetchDestination = async () => {
    loading.value = true
    const { data } = await useFetch('/api/destinations', {
      query: { q: route.params.slug }
    })
// Assuming the second API call's response has a 'data' property, not 'respo'.
        const { data: locationPictures } = await useFetch('/api/locationsPicture', {
        query: { q: route.params.slug }
        })

        console.log(data.value, "datadatadatadata")
        console.log(locationPictures.value, "locationPictures")
//     if (data.value && data.value.length > 0) {
      destination.value = data.value[0]
      attractions.value = locationPictures.value[0]
//     } else {
//       destination.value = null
//       attractions.value = []
//     }
  
    loading.value = false
  }
  
  // Fetch data on mount and when the city in the URL changes
  onMounted(fetchDestination)
  watch(() => route.params.city, fetchDestination)
  </script>
  