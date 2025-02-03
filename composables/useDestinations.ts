import { ref, watch } from 'vue'
import pkg from 'lodash'
// import { debounce } from 'lodash'
const { debounce } = pkg

export function useDestinations() {
  // State for the search query and destinations list
  const searchQuery = ref('')
  const destinations = ref<any[]>([])

  // Function to fetch destinations based on the search query
  const fetchDestinations = async () => {
      const { data } = await useFetch('/api/destinations', {
        query: { q: searchQuery.value },
      })
      destinations.value = data.value || []
  }

  // Debounce the fetchDestinations function to avoid making too many API calls
  const debouncedFetchDestinations = debounce(fetchDestinations, 300)

  // Watch for changes in the search query and trigger the debounced function
  watch(searchQuery, () => {
    debouncedFetchDestinations()
  })

  // Return the searchQuery, destinations list, and a method to trigger fetch manually
  return {
    searchQuery,
    destinations,
    fetchDestinations, // In case you want to manually fetch destinations elsewhere
  }
}
