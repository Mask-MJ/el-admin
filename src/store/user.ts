import type { RemovableRef } from '@vueuse/core';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { TOKEN_KEY } from '/@/utils/axios/httpEnum';
import { router } from '/@/router';
import { PageEnum } from '/@/settings/config';
import { loginApi, getUserInfoAsync } from '/@/api/basic/user';

interface state {
  token: RemovableRef<string | null>;
}

export const useUserStore = defineStore('user', () => {
  const state = reactive<state>({
    token: useStorage(TOKEN_KEY, null),
  });

  const logout = () => {
    console.log('logout');
  };

  // 登录
  const login = async (params) => {
    try {
      const data = await loginApi(params);
      state.token = data.access_token;
      return afterLoginAction();
    } catch (e) {
      Promise.reject(e);
    }
  };

  const afterLoginAction = async () => {
    if (!state.token) return null;
    // get user info
    const userInfo = await getUserInfoAsync();
    await router.replace(PageEnum.BASE_HOME);
    return userInfo;
  };

  return {
    state,
    login,
    afterLoginAction,
    logout,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
