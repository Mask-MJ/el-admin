import type { RouteType } from '/#/vue-router';
import { PageEnum } from '/@/settings/config';

export const basicRoutes: RouteType[] = [
  {
    name: 'Login',
    path: '/login',
    component: () => import('/@/pages/Basic/login/index.vue'),
    hidden: true,
  },
  {
    name: 'Root',
    path: '/',
    redirect: PageEnum.BASE_HOME,
    hidden: true,
  },
];
