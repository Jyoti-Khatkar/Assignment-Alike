import { defineNuxtRouteMiddleware, navigateTo } from '#app'

export const useAuth = () => {
  const user = useState('user', () => null)
  const isAuthenticated = computed(() => !!user.value)

  const login = (email: string, password: string) => {
    const users = import.meta.client ? JSON.parse(localStorage.getItem('users') || '[]') : []
    const foundUser = users.find((u: any) => u.email === email && u.password === password)
    
    if (foundUser) {
      user.value = foundUser
      if (import.meta.client) {
        localStorage.setItem('currentUser', JSON.stringify(foundUser))
      }
      return { success: true }
    }
    
    // Check if the email exists in users
    const emailExists = users.some((u: any) => u.email === email)
    return { 
      success: false, 
      message: emailExists ? 'Invalid password' : 'User not found. Please register first.'
    }
  }

  const register = (email: string, password: string) => {
    if (import.meta.client) {
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const exists = users.some((u: any) => u.email === email)
      
      if (exists) {
        return false
      }

      const newUser = { email, password }
      users.push(newUser)
      localStorage.setItem('users', JSON.stringify(users))
      return true
    }
    return false
  }

  const logout = () => {
    user.value = null
    if (import.meta.client) {
      localStorage.removeItem('currentUser')
    }
  }

  const initAuth = () => {
    if (import.meta.client) {
      const savedUser = localStorage.getItem('currentUser')
      if (savedUser) {
        user.value = JSON.parse(savedUser)
      }
    }
  }

  return {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    initAuth
  }
}