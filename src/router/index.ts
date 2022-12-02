import type { App } from 'vue';
import type { RouteType } from '/#/vue-router';
import { createRouter, createWebHashHistory } from 'vue-router';
import { basicRoutes } from './routes';
import { TOKEN_KEY } from '/@/utils/axios/httpEnum';
import { setupRouterGuard } from './guard';
import { setupLayouts } from 'virtual:generated-layouts';
import generatedRoutes from 'virtual:generated-pages';

const LayoutRoutes = setupLayouts(generatedRoutes);
export const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: [...basicRoutes],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export const setupRouter = async (app: App) => {
  await addDynamicRoutes();
  setupRouterGuard(router);

  app.use(router);
};

// 异步获取路由 和 本地文件路由做匹配
export const addDynamicRoutes = async () => {
  const token = useStorage(TOKEN_KEY, null);
  if (!token.value) return;
  const permissionStore = usePermissionStore();
  const accessRoutes = await permissionStore.buildRoutes(LayoutRoutes);
  accessRoutes.forEach((route: RouteType) => {
    !router.hasRoute(route.name) && router.addRoute(route);
  });
};
