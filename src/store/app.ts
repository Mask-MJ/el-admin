import { acceptHMRUpdate, defineStore } from 'pinia';
import NProgress from 'nprogress';

export const useAppStore = defineStore('app', () => {
  const state = reactive({
    collapse: false,
  });

  const changeCollapse = () => {
    state.collapse = !state.collapse;
  };

  const reloadPage = async () => {
    NProgress.start();
    await nextTick();

    setTimeout(() => {
      document.documentElement.scrollTo({ left: 0, top: 0 });
      NProgress.done();
    }, 100);
  };

  return {
    state,
    changeCollapse,
    reloadPage,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot));
}
