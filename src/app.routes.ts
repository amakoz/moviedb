/* All App routes must be registered here */
export const ROUTE_DASHBOARD = { path: '/', name: 'Dashboard', component: () => import('./pages/PageDashboard.vue') }
export const ROUTE_DASHBOARD_MOVIES_LIST = { path: 'list', name: 'MoviesList', component: () => import('./views/Dashboard/ViewMoviesList.vue') }
export const ROUTE_DASHBOARD_MOVIES_FAVORITES = { path: 'favorites', name: 'MoviesWish', component: () => import('./views/Dashboard/ViewMoviesFavorites.vue')}
