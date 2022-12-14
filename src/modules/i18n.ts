import type { App } from 'vue';
import { createI18n } from 'vue-i18n';

export let i18n;

const messages = Object.fromEntries(
  Object.entries(
    import.meta.glob<{ default: any }>('../../locales/*.y(a)?ml', { eager: true }),
  ).map(([key, value]) => {
    const yaml = key.endsWith('.yaml');
    return [key.slice(14, yaml ? -5 : -4), value.default];
  }),
);
export const install = (app: App) => {
  i18n = createI18n({
    globalInjection: true,
    legacy: false,
    locale: 'en',
    messages,
  });
  app.use(i18n);
};
