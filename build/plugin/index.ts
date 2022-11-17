import type { PluginOption } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import mkcert from 'vite-plugin-mkcert';
import Unocss from 'unocss/vite';
import VueI18n from '@intlify/vite-plugin-vue-i18n';
import Pages from 'vite-plugin-pages';
import Layouts from 'vite-plugin-vue-layouts';
// import Inspect from 'vite-plugin-inspect';
import vitePluginImp from 'vite-plugin-imp';

import { configAutoImportPlugin } from './autoImport';

export const createVitePlugins = (): PluginOption[] => [
  vue(),
  mkcert(),
  Pages({
    dirs: [
      { dir: 'src/pages', baseRoute: '' },
      { dir: 'src/pages/Basic', baseRoute: '' },
    ],
    exclude: ['**/components/*.vue'],
  }),
  Layouts(),
  VueI18n({
    runtimeOnly: true,
    include: [path.resolve(process.cwd(), 'locales/**')],
  }),
  Unocss(),
  // vitePluginImp({
  //   libList: [
  //     {
  //       libName: '@formily/element-plus',
  //       libDirectory: 'esm',
  //       style(name) {
  //         return `@formily/element-plus/esm/${name}/style.js`;
  //       },
  //     },
  //   ],
  // }),
  ...configAutoImportPlugin(),
  // Inspect(),
];
