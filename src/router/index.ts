import MainLayout from '@/layouts/MainLayout.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          component: () => import('@/modules/Home/views/HomeView.vue'),
        },
        {
          path: 'offerings',
          component: () => import('@/modules/Offerings/views/OfferingsView.vue'),
        },
        {
          path: 'offerings/:id',
          component: () => import('@/modules/Offerings/views/OfferingsProfileView.vue'),
        },
        {
          path: 'investors',
          component: () => import('@/modules/Investors/views/InvestorsView.vue'),
        },
        {
          path: 'investors/:id',
          component: () => import('@/modules/Investors/views/InvestorProfileView.vue'),
        },
        {
          path: 'transactions',
          component: () => import('@/modules/Transactions/views/TransactionsView.vue'),
        },
        {
          path: 'documents',
          component: () => import('@/modules/Documents/views/DocumentsView.vue'),
        },
        {
          path: 'analytics',
          component: () => import('@/modules/Analytics/views/AnalyticsView.vue'),
        },
        {
          path: 'settings',
          component: () => import('@/modules/Settings/views/SettingsView.vue'),
        },
        {
          path: 'profile',
          component: () => import('@/modules/Profile/views/ProfileView.vue'),
        },
      ],
    },
  ],
})

export default router
