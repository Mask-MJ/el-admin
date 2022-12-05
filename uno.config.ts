import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';
import { icons as antdIcons } from '@iconify-json/ant-design';
import { icons as epIcons } from '@iconify-json/ep';
const antdIconNames = Object.keys(antdIcons.icons).map(
  (iconName) => `i-${antdIcons.prefix}:${iconName}`,
);
const epIconNames = Object.keys(epIcons.icons).map((iconName) => `i-${epIcons.prefix}:${iconName}`);

export default defineConfig({
  shortcuts: [
    ['flex-c-b', 'flex items-center justify-between'],
    ['flex-c-c', 'flex items-center justify-center'],
    ['icon-btn', 'flex items-center cursor-pointer h-full hover:bg-light-400 px-2'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: { display: 'inline-block' },
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  safelist: [...'prose prose-sm m-auto text-left'.split(' '), ...antdIconNames, ...epIconNames],
});
