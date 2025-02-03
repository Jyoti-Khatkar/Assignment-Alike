<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <!-- Main Itinerary Card -->
      <div class="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
        <div class="md:flex">
          <div class="md:w-1/2">
            <NuxtImg
              src="https://images.unsplash.com/photo-1469474968028-56623f02e42e"
              alt="Travel Planning"
              class="w-full h-full object-cover"
              width="500"
              height="500"
              loading="lazy"
            />
          </div>

          <div class="md:w-1/2 p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Plan Your Trip</h2>

            <form @submit.prevent="saveItinerary" class="space-y-4">
              <div class="mb-4 relative">
                <label class="block text-gray-700">Destination</label>
                <input
                  type="text"
                  v-model="searchQuery"
                  @click="showAllDestinations"
                  @blur="handleBlur"
                  @focus="focusF"
                  class="w-full p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                  placeholder="Search destination..."
                />

                <!-- Dropdown List -->
                <div
                  v-if="showDropdown"
                  class="absolute z-10 mt-2 w-full bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto"
                  :class="destinations.length > 2 ? 'max-h-[120px] overflow-y-auto' : ''"
                >
                  <div v-if="destinations.length > 0" v-for="dest in destinations" :key="dest.id" class="p-2 hover:bg-gray-100 cursor-pointer" @click="selectDestination(dest)">
                    <div class="font-bold">{{ dest.title }}</div>
                    <div class="text-sm text-gray-600">{{ dest.description }}</div>
                  </div>
                  <div v-else class="p-2 text-gray-600">No results found.</div>
                </div>
              </div>

              <div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Start Date</label>
                    <input
                      v-model="newItinerary.startDate"
                      type="date"
                      required
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700">End Date</label>
                    <input
                      v-model="newItinerary.endDate"
                      type="date"
                      required
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Save Itinerary
              </button>
            </form>
          </div>
        </div>
      </div>

      <!-- Saved Itineraries -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" :class="savedItineraries.length > 3 ? 'max-h-[320px] overflow-y-auto' : ''">
        <div v-for="itinerary in savedItineraries" :key="itinerary.id" class="bg-white rounded-lg shadow-md overflow-hidden">
          <NuxtImg
            :src="itinerary.image"
            :alt="itinerary.destination"
            class="w-full h-48 object-cover"
            width="500"
            height="500"
            loading="lazy"
          />
          <div class="p-4">
            <h3 class="text-lg font-semibold mb-2">{{ itinerary.destination }}</h3>
            <p class="text-sm text-gray-600 mb-2">{{ formatDate(itinerary.startDate) }} - {{ formatDate(itinerary.endDate) }}</p>
            <p class="text-sm text-gray-500">{{ itinerary.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
const { searchQuery, destinations } = useDestinations()
definePageMeta({
  middleware: ['auth']
})
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
// const destination = ref('');
const isDestinationSelected = ref(false);
const dropdownClose = ref(true);
interface Itinerary {
  id: number
  destination: string
  startDate: string
  endDate: string
  image: string
  description: string
}

interface Destination {
  id: number
  title: string
}

const newItinerary = ref({
  title: '',
  startDate: '',
  endDate: '',
  image:'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
  description:''
})

const savedItineraries = ref<Itinerary[]>([])



onMounted(() => {
  loadSavedItineraries() // Load saved itineraries
})

// Computed property to control dropdown visibility
const showDropdown = computed(() => {
  return (searchQuery.value.trim() !== '' || !isDestinationSelected.value) && !dropdownClose.value  ;
});

// Fetch all destinations when the search input is clicked
const showAllDestinations = async () => {
  isDestinationSelected.value = false; // Reset selection state
  const { data } = await useFetch('/api/destinations');
  destinations.value = data.value || [];
};

// Fetch destinations based on search query
// const fetchDestinations = async () => {
//     const { data } = await useFetch('/api/destinations', {
//       query: { q: destination.value },
//     });
//     destinations.value = data.value || [];

// };


const focusF = () =>{
  dropdownClose.value = false;
}

const handleBlur = () =>{
  setTimeout(() => {
  dropdownClose.value = true;
    
  }, 500);
}

const loadSavedItineraries = () => {
  const saved = localStorage.getItem('itineraries')
  if (saved) {
    savedItineraries.value = JSON.parse(saved)
  }
}

const saveItinerary = () => {
  const itinerary: Itinerary = {
    id: Date.now(),
    destination: newItinerary.value.title,
    startDate: newItinerary.value.startDate,
    endDate: newItinerary.value.endDate,
    image: newItinerary.value.image,
    description: newItinerary.value.description
  }

  savedItineraries.value.push(itinerary)
  localStorage.setItem('itineraries', JSON.stringify(savedItineraries.value))

  // Reset form
  searchQuery.value = ""
  newItinerary.value = {
    title: '',
    startDate: '',
    endDate: '',
    description:'',
    image:'https://images.unsplash.com/photo-1469474968028-56623f02e42e'
  }
}

// Select a destination from the dropdown
const selectDestination = (destinationVal: Destination) => {
  searchQuery.value = destinationVal.title
  newItinerary.value = {
    ...newItinerary.value, // Retain the existing properties
    ...destinationVal // Merge destination properties
  }
  // searchQuery.value = ''
  // destinations.value = []
}
</script>