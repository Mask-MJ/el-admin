import type { PluginOption } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import mkcert from 'vite-plugin-mkcert';
import Unocss from 'unocss/vite';
import VueI18n from '@intlify/vite-plugin-vue-i18n';
import Pages from 'vite-plugin-pages';
import Layouts from 'vite-plugin-vue-layouts';
// import Inspect from 'vite-plugin-inspect';
// 用于读取 three.js 材质文件
import glsl from 'vite-plugin-glsl';

import { configAutoImportPlugin } from './autoImport';
import { configStyleImportPlugin } from './styleImport';

export const createVitePlugins = (): PluginOption[] => [
  vue(),
  mkcert(),
  glsl(),
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
  configStyleImportPlugin(),
  ...configAutoImportPlugin(),
  // Inspect(),
];
