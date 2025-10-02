import type { RouteRecordRaw } from 'vue-router';

export const investorRoutes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'investor-home',
    component: () => import('@/investor/modules/Home/views/HomeView.vue'),
  },
  {
    path: 'trade',
    name: 'investor-trade',
    component: () => import('@/investor/modules/Trade/views/TradeView.vue'),
  },
  {
    path: 'portfolio',
    name: 'investor-portfolio',
    component: () => import('@/investor/modules/Portfolio/views/PortfolioView.vue'),
  },
  {
    path: 'transactions',
    name: 'investor-transactions',
    component: () => import('@/investor/modules/Transactions/views/TransactionsView.vue'),
  },
  {
    path: 'community',
    name: 'investor-community',
    component: () => import('@/investor/modules/Community/views/CommunityView.vue'),
  },
  {
    path: 'documents',
    name: 'investor-documents',
    component: () => import('@/investor/modules/Documents/views/DocumentsView.vue'),
  },
  {
    path: 'settings',
    name: 'investor-settings',
    component: () => import('@/investor/modules/Settings/views/SettingsView.vue'),
  },
]
