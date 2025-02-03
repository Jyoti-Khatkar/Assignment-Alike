// export default defineNuxtPlugin(() => {
//   addRouteMiddleware('auth', (to, from) => {
//     const auth = useAuthStore()

//     // Prevent SSR issues
//     if (import.meta.server) return
//     // Redirect if not authenticated and trying to access protected pages
//     if (!auth.isAuthenticated && !to.path.startsWith('/auth/') && to.path !== '/') {
//       return navigateTo('/auth/signin', { replace: true }) // Avoid history stacking
//     }
    
//     // Redirect to home page if already authenticated and trying to access auth pages
//     if (auth.isAuthenticated && to.path.startsWith('/auth/') && to.path !== from.path) {
//       return navigateTo('/', { replace: true }) // Avoid history stacking
//     }
//   }, { global: true })
// })

