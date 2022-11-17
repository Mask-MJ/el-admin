import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';

const yourResolver = (name: string) => {
  if (name === 'Input') {
    console.log(name);
    return { name, as: name, from: '@formily/element-plus/esm' };
  }
  if (name === 'FormItem' || name === 'Checkbox' || name === 'Submit' || name === 'Form')
    return { name, as: name, from: '@formily/element-plus/esm' };

  if (name === 'createForm') return { name, as: name, from: '@formily/core/esm' };
  if (name === 'createSchemaField') return { name, as: name, from: '@formily/vue/esm' };
};

export const configAutoImportPlugin = () => [
  AutoImport({
    // 自动导入 vue vue-router @vueuse/head @vueuse/core
    imports: ['vue', 'vue-router', 'vue-i18n', '@vueuse/head', '@vueuse/core'],
    resolvers: [yourResolver, ElementPlusResolver()],
    vueTemplate: true,
    dirs: ['src/store'],
    dts: 'types/auto-imports.d.ts',
  }),
  Components({
    extensions: ['vue'],
    include: [/\.vue$/, /\.vue\?vue/],
    dts: 'types/components.d.ts',
    resolvers: [IconsResolver(), yourResolver, ElementPlusResolver({ importStyle: 'sass' })],
  }),
  // 自动导入 icon
  Icons({
    autoInstall: true,
  }),
];
