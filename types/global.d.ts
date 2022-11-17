declare type Nullable<T> = T | null;
declare type Recordable<T = any> = Record<string, T>;
declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>;
declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}
declare interface ViteEnv {
  VITE_PORT: number;
  VITE_PUBLIC_PATH: string;
  VITE_PROXY: [string, string][];
  VITE_GLOB_APP_TITLE: string;
  VITE_GLOB_APP_SHORT_NAME: string;
  VITE_DROP_CONSOLE: boolean;
}

interface Window {
  $loadingBar?: import('naive-ui').LoadingBarProviderInst;
  $dialog?: import('naive-ui').DialogProviderInst;
  $message?: import('naive-ui').MessageProviderInst;
  $notification?: import('naive-ui').NotificationProviderInst;
}
