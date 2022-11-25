import { createStyleImportPlugin } from 'vite-plugin-style-import';

export function configStyleImportPlugin() {
  const styleImportPlugin = createStyleImportPlugin({
    libs: [
      {
        libraryName: '@formily/element-plus',
        resolveStyle: (name) => {
          return `@formily/element-plus/esm/${name}/style.js`;
        },
      },
    ],
  });
  return styleImportPlugin;
}
