import type { RouteRecordRaw } from 'vue-router';

export const investorRoutes: RouteRecordRaw[] = [
  {
    path: '',
    component: () => import('@/investor/modules/Home/views/HomeView.vue'),
  },
]
