import MainLayout from '@/layouts/MainLayout.vue'
import GuessLayout from '@/layouts/GuessLayout.vue'
import { createRouter, createWebHistory } from 'vue-router'

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
      component: MainLayout,
      children: [
        {
          path: '',
          component: () => import('@/startup/modules/Home/views/HomeView.vue'),
        },
        {
          path: 'offerings',
          component: () => import('@/startup/modules/Offerings/views/OfferingsView.vue'),
        },
        {
          path: 'offerings/:id',
          component: () => import('@/startup/modules/Offerings/views/OfferingsProfileView.vue'),
        },
        {
          path: 'investors',
          component: () => import('@/startup/modules/Investors/views/InvestorsView.vue'),
        },
        {
          path: 'investors/:id',
          component: () => import('@/startup/modules/Investors/views/InvestorProfileView.vue'),
        },
        {
          path: 'transactions',
          component: () => import('@/startup/modules/Transactions/views/TransactionsView.vue'),
        },
        {
          path: 'documents',
          component: () => import('@/startup/modules/Documents/views/DocumentsView.vue'),
        },
        {
          path: 'analytics',
          component: () => import('@/startup/modules/Analytics/views/AnalyticsView.vue'),
        },
        {
          path: 'settings',
          component: () => import('@/startup/modules/Settings/views/SettingsView.vue'),
        },
        {
          path: 'profile',
          component: () => import('@/startup/modules/Profile/views/ProfileView.vue'),
        },
      ],
    },
  ],
})

export default router
