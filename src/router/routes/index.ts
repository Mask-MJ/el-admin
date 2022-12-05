import type { RouteType } from '/#/vue-router';
import { PageEnum } from '/@/settings/config';

export const REDIRECT_NAME = 'Redirect';

export const basicRoutes: RouteType[] = [
  {
    name: 'Login',
    path: '/login',
    component: () => import('/@/views/Basic/login/index.vue'),
    hidden: true,
  },
  {
    name: 'Root',
    path: '/',
    redirect: PageEnum.BASE_HOME,
    hidden: true,
  },
  {
    path: '/redirect',
    name: 'RedirectTo',
    meta: {
      title: REDIRECT_NAME,
    },
    children: [
      {
        path: '/redirect',
        name: REDIRECT_NAME,
        component: () => import('/@/views/Basic/redirect.vue'),
        meta: {
          title: REDIRECT_NAME,
        },
      },
    ],
  },
];
