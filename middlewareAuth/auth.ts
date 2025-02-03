
// export default defineNuxtRouteMiddleware((to, from) => {
//   if (import.meta.client) {
//     const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
//     if (!isAuthenticated && !['/auth/signin', '/auth/register'].includes(to.path)) {
//       return navigateTo('/auth/signin');
//     }

//     if (isAuthenticated && ['/auth/signin', '/auth/register'].includes(to.path)) {
//       return navigateTo('/');
//     }
//   }
// });
