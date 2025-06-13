import { createRouter, createWebHistory } from 'vue-router'
import ComputerView from '../views/ComputerView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/computer',
      name: 'computer',
      component: ComputerView,
    },
  ],
})

export default router
