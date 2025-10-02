import StartupLayout from '@/layouts/StartupLayout.vue'
import InvestorLayout from '@/layouts/InvestorLayout.vue'
import GuessLayout from '@/layouts/GuessLayout.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { startupRoutes } from './startupRoutes'
import { investorRoutes } from './investorRoutes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: GuessLayout,
      children: [
        {
          path: '',
          component: () => import('@/shared/modules/Auth/views/LoginView.vue'),
        },
      ],
    },
    {
      path: '/startup',
      component: StartupLayout,
      children: startupRoutes,
    },
    {
      path: '/investor',
      component: InvestorLayout,
      children: investorRoutes,
    },
  ],
})

export default router
