import type { Router } from 'vue-router';
import NProgress from 'nprogress';
import { TOKEN_KEY } from '/@/utils/axios/httpEnum';

export const setupRouterGuard = (router: Router) => {
  createPageLoadingGuard(router);
  createPermissionGuard(router);
  createPageTitleGuard(router);
};

const WHITE_LIST = ['/login'];
const baseTitle: string = import.meta.env.VITE_GLOB_APP_TITLE;

const createPageLoadingGuard = (router: Router) => {
  router.beforeEach(() => {
    NProgress.start();
  });

  router.afterEach(() => {
    setTimeout(() => {
      NProgress.done();
    }, 200);
  });

  router.onError(() => {
    window.$loadingBar?.finish();
  });
};

const createPermissionGuard = (router: Router) => {
  router.beforeEach(async (to) => {
    const token = useStorage(TOKEN_KEY, null);
    if (!token.value) {
      if (to.path === '/login') return { path: '/' };

      return true;
    } else {
      if (WHITE_LIST.includes(to.path)) return true;

      return { path: '/login', query: { ...to.query, redirect: to.path } };
    }
  });
};

const createPageTitleGuard = (router: Router) => {
  router.afterEach((to) => {
    const pageTitle = to.meta?.title;
    if (pageTitle) document.title = `${pageTitle} | ${baseTitle}`;
    else document.title = baseTitle;
  });
};
