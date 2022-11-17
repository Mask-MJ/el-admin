import type { RouteRecordRaw } from 'vue-router';

interface Meta {
  title?: string;
  icon?: string;
  noCache?: boolean;
}

interface RouteItem {
  name: string;
  path: string;
  component?: any;
  redirect?: string;
  hidden?: boolean;
  meta?: Meta;
  children?: RoutesType;
}

export type RouteType = RouteRecordRaw & RouteItem;
