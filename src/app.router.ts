import { createRouter, createWebHistory } from 'vue-router'

import {
  ROUTE_DASHBOARD,
  ROUTE_DASHBOARD_MOVIES_LIST,
  ROUTE_DASHBOARD_MOVIES_FAVORITES,
} from './app.routes';


const routes = [
  {
    path: ROUTE_DASHBOARD.path,
    name: ROUTE_DASHBOARD.name,
    component: ROUTE_DASHBOARD.component,
    children: [
      {
        path: ROUTE_DASHBOARD_MOVIES_LIST.path,
        name: ROUTE_DASHBOARD_MOVIES_LIST.name,
        component: ROUTE_DASHBOARD_MOVIES_LIST.component,
      },
      {
        path: ROUTE_DASHBOARD_MOVIES_FAVORITES.path,
        name: ROUTE_DASHBOARD_MOVIES_FAVORITES.name,
        component: ROUTE_DASHBOARD_MOVIES_FAVORITES.component,
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
