import type { RouteRecordRaw } from 'vue-router';
import type { RouteItem } from '/#/vue-router';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { getMenuList } from '/@/api/basic/user';
import { find } from 'lodash-es';

interface state {
  accessRoutes: RouteItem[];
}

export const usePermissionStore = defineStore('permission', () => {
  const state = reactive<state>({
    accessRoutes: [],
  });
  const getMenu = () =>
    state.accessRoutes.filter((item) => !['/', '/login', '/:all(.*)*'].includes(item.path));

  const buildRoutes = async (LayoutRoutes: RouteRecordRaw[]): Promise<RouteItem[]> => {
    let routerArray = await getMenuList();
    /** 提取完整路径 */
    const generateRoutes: RouteItem[] = [];
    LayoutRoutes.forEach((ele) => {
      if (['/', '/login', '/:all(.*)*'].includes(ele.path)) {
        generateRoutes.push(ele as unknown as RouteItem);
      } else {
        const name = ele.children![0].name as string;
        const fatherRouter = find(routerArray, ['name', name.split('-')[0]]);
        if (fatherRouter) {
          const parentRouter = {
            name: fatherRouter.name,
            path: fatherRouter.path,
            meta: fatherRouter.meta,
            request: `${fatherRouter.path}/${fatherRouter.children[0].path}`,
            children: [] as RouteItem[],
          };
          const route = find(generateRoutes, ['name', fatherRouter.name]);

          if (!route) {
            generateRoutes.push(parentRouter);
          }

          const childrenRouter = find(fatherRouter.children, ['name', name.split('-')[1]]);
          if (childrenRouter) {
            const newRouter = {
              name: `${name}-component`,
              path: ele.path,
              children: ele.children,
              component: ele.component,
              meta: childrenRouter.meta,
            };
            if (route) {
              route.children.push(newRouter);
            } else {
              parentRouter.children.push(newRouter);
            }
          }
        }
      }
    });
    state.accessRoutes = generateRoutes;
    return generateRoutes;
  };

  return {
    state,
    getMenu,
    buildRoutes,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePermissionStore, import.meta.hot));
}
