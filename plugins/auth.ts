// export default defineNuxtPlugin(() => {
//   addRouteMiddleware('auth', () => {
//     const auth = useAuthStore()
//     const route = useRoute()
    
//     if (!auth.isAuthenticated && 
//         !route.path.startsWith('/auth/') && 
//         route.path !== '/') {
//       return navigateTo('/auth/signin')
//     }
    
//     if (auth.isAuthenticated && route.path.startsWith('/auth/')) {
//       return navigateTo('/')
//     }
//   }, { global: true })
// })

// export default defineNuxtPlugin(() => {
//   addRouteMiddleware('auth', (to, from) => {
//     const auth = useAuthStore()

//     // Redirect if not authenticated and trying to access protected pages
//     if (!auth.isAuthenticated && !to.path.startsWith('/auth/') && to.path !== '/') {
//       return navigateTo('/auth/signin')
//     }
    
//     // Redirect to home page if authenticated and trying to access auth pages
//     if (auth.isAuthenticated && to.path.startsWith('/auth/')) {
//       return navigateTo('/')
//     }
//   }, { global: true })
// })

export default defineNuxtPlugin(() => {
  addRouteMiddleware('auth', (to, from) => {
    const auth = useAuthStore()

    // Prevent SSR issues
    if (import.meta.server) return
    // Redirect if not authenticated and trying to access protected pages
    if (!auth.isAuthenticated && !to.path.startsWith('/auth/') && to.path !== '/') {
      return navigateTo('/auth/signin', { replace: true }) // Avoid history stacking
    }
    
    // Redirect to home page if already authenticated and trying to access auth pages
    if (auth.isAuthenticated && to.path.startsWith('/auth/') && to.path !== from.path) {
      return navigateTo('/', { replace: true }) // Avoid history stacking
    }
  }, { global: true })
})

