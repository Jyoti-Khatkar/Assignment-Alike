// export default defineNuxtRouteMiddleware((to, from) => {
//   const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
  
//   if (!isAuthenticated && to.path !== '/auth/signin' && to.path !== '/auth/register') {
//     return navigateTo('/auth/signin')
//   }
  
//   if (isAuthenticated && (to.path === '/auth/signin' || to.path === '/auth/register')) {
//     return navigateTo('/')
//   }
// })


export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.client) {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated && !['/auth/signin', '/auth/register'].includes(to.path)) {
      return navigateTo('/auth/signin');
    }

    if (isAuthenticated && ['/auth/signin', '/auth/register'].includes(to.path)) {
      return navigateTo('/');
    }
  }
});
