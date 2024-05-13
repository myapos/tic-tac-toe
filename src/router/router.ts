import { createWebHistory, createRouter } from 'vue-router'
import type { RouteLocationNormalized } from 'vue-router'
import TicTacToe from '@/components/TicTacToe.vue'

const getProps = (route: RouteLocationNormalized) => ({
  N: parseInt((route.query.N as string) || '3'), // Parse N from the query, default to 3 if not present
  M: parseInt((route.query.M as string) || '3') // Parse M from the query, default to 3 if not present
})

const routes = [
  {
    path: '/',
    component: TicTacToe,
    props: getProps
  },
  {
    path: '/reset-params',
    component: TicTacToe,
    props: getProps
  },
  // Catch-all route to redirect to the root URL for any unmatched routes
  { path: '/:catchAll(.*)', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
