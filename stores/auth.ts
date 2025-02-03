import { defineStore } from 'pinia'

interface User {
  email: string
}
export const useAuthStore = defineStore('auth', {
  state: () => ({

    isAuthenticated: false,
    user: null as User | null
  }),
  
  actions: {
    initializeAuth() {
      if (import.meta.client) { // Check if running on the client side
        const isAuth = localStorage.getItem('isAuthenticated') === 'true'
        const user = localStorage.getItem('currentUser')
        
        this.isAuthenticated = isAuth
        this.user = user ? JSON.parse(user) : null
      }
    },
    
    login(user: User) {
      if (import.meta.client) { // Check if running on the client side
        this.isAuthenticated = true
        this.user = user
        localStorage.setItem('isAuthenticated', 'true')
        localStorage.setItem('currentUser', JSON.stringify(user))
      }
    },
    
    logout() {
      if (import.meta.client) { // Check if running on the client side
        this.isAuthenticated = false
        this.user = null
        localStorage.removeItem('isAuthenticated')
        localStorage.removeItem('currentUser')
      }
    }
  }
})