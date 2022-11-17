import { acceptHMRUpdate, defineStore } from 'pinia';
import NProgress from 'nprogress';

export const useAppStore = defineStore('app', () => {
  const state = reactive({
    reloadFlag: true,
  });

  const reloadPage = async () => {
    NProgress.start();
    state.reloadFlag = false;
    await nextTick();
    state.reloadFlag = true;

    setTimeout(() => {
      document.documentElement.scrollTo({ left: 0, top: 0 });
      NProgress.done();
    }, 100);
  };

  return {
    reloadPage,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot));
}
