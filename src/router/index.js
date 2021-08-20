import { createRouter, createWebHistory } from 'vue-router'
import Main from "@/views/Main";

const routes = [
  {
    path: '/',
    name: 'Popular',
    component: Main
  },
  {
    path: '/topRated',
    name: 'Top Rated',
    component: Main
  },
  {
    path: '/upcoming',
    name: 'Upcoming',
    component: Main
  },
  {
    path: '/genres/:genre',
    name: 'Genres',
    component: () => import(/* webpackChunkName: "genres" */ '../views/Genres.vue')
  },
  {
    path: '/details/:id',
    name: 'Details',
    component: () => import(/* webpackChunkName: "details" */ '../views/Details.vue')
  },
  {
    path: '/search/:id',
    name: 'Search',
    component: () => import(/* webpackChunkName: "search" */ '../views/Search.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
