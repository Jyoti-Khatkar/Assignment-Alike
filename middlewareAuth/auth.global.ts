// export default defineNuxtRouteMiddleware((to,from) => {
//   if (import.meta.server) return; // Ensure middleware doesn't run on SSR

//   const auth = useAuthStore();

//   // Wait for the store to be ready before checking authentication
//   if (auth.isAuthenticated === undefined) return;

//   // Allow access to authentication pages and home page
//   if (['/', '/auth/signin', '/auth/register'].includes(to.path)) {
//     return;
//   }

//   // Redirect to login if not authenticated
//   if (!auth.isAuthenticated) {
//     return navigateTo('/auth/signin');
//   }
// });

