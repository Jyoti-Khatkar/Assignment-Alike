export default defineNuxtPlugin(() => {
    const { initAuth } = useAuth()
    initAuth() // Ensure auth is initialized before routes are checked
  })
  