import type { RemovableRef } from '@vueuse/core';
import type { UserInfo } from '/@/api/basic/model/userModel';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { TOKEN_KEY } from '/@/utils/axios/httpEnum';
import { router } from '/@/router';
import { PageEnum } from '/@/settings/config';
import { loginApi, getUserInfoAsync } from '/@/api/basic/user';

interface state {
  token: RemovableRef<string | null>;
  userInfo: RemovableRef<string | null>;
}
// user info key
const USER_INFO_KEY = 'USER__INFO__';

export const useUserStore = defineStore('user', () => {
  const state = reactive<state>({
    token: useStorage(TOKEN_KEY, null),
    userInfo: useStorage(USER_INFO_KEY, null),
  });

  // 获取用户信息
  const getUserInfo = (): Nullable<UserInfo> =>
    state.userInfo ? JSON.parse(state.userInfo) : getUserInfoAction();

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
    const userInfo = await getUserInfoAction();
    await router.replace(PageEnum.BASE_HOME);
    return userInfo;
  };

  // 获取用户信息
  const getUserInfoAction = async () => {
    if (!state.token) return null;
    const userInfo = await getUserInfoAsync();
    useStorage(USER_INFO_KEY, userInfo.user);
    return userInfo;
  };

  return {
    state,
    login,
    getUserInfo,
    afterLoginAction,
    logout,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
