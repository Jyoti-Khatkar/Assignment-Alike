export default defineNuxtRouteMiddleware((to) => {
    const { isAuthenticated,initAuth  } = useAuth()
    
    // For client-side navigation
    if (import.meta.client) {
        initAuth()
      if (to.path === '/itinerary' && !isAuthenticated.value) {
        return navigateTo('/auth/login')
      }
    }
    
  })