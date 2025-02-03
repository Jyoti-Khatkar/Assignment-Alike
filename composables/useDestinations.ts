import { ref } from 'vue';

export const useDestinations = () => {
  const destinations = ref([]);
  const isLoading = ref(false);

  const fetchDestinations = async (query: string) => {
    isLoading.value = true;
    try {
      const { data } = await useFetch('/api/destinations', {
        query: { q: query },
      });
      destinations.value = data.value;
    } catch (error) {
      console.error('Error fetching destinations:', error);
    } finally {
      isLoading.value = false;
    }
  };

  return { destinations, isLoading, fetchDestinations };
};