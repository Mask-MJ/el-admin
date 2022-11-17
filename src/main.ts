import { createApp } from 'vue';
import App from './App.vue';

// import '@unocss/reset/normalize.css';
// import '@unocss/reset/tailwind.css';
// import '@unocss/reset/eric-meyer.css';
import 'uno.css';
import 'nprogress/nprogress.css';
import 'element-plus/dist/index.css';
// import '/@/styles/index.scss';
// If you want to use ElMessage, import it.
// import 'element-plus/theme-chalk/src/message.scss';
// import 'element-plus/theme-chalk/src/base.scss';
// import '@formily/element-plus/esm/style.js';
import { setupStore } from '/@/store';
import { setupRouter } from '/@/router';

const setupApp = async () => {
  const app = createApp(App);
  setupStore(app);
  await setupRouter(app);

  app.mount('#app');
};

setupApp();
