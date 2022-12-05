<template>
  <div class="flex-c-b px-3 h-12">
    <el-scrollbar>
      <el-tabs
        class="ng-tabs"
        v-model="currentName"
        type="card"
        @tab-click="handleTabClick"
        @tab-remove="handleTabRemove"
      >
        <el-tab-pane
          v-for="(item, index) in tablist"
          :key="item.name"
          :closable="index !== 0"
          :name="item.name"
        >
          <template #label>
            <span>{{ item.meta.title }} </span>
          </template>
        </el-tab-pane>
      </el-tabs>
    </el-scrollbar>
    <el-dropdown class="cursor-pointer">
      <el-icon size="20">
        <i class="i-ep:menu hover:rotate-90 duration-400" />
      </el-icon>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item :icon="Refresh" @click="refreshPage">刷新</el-dropdown-item>
          <el-dropdown-item :icon="Close" @click="closeOther">关闭其他</el-dropdown-item>
          <el-dropdown-item :icon="Back" @click="closeLeft">关闭左侧</el-dropdown-item>
          <el-dropdown-item :icon="Right" @click="closeRight">关闭右侧</el-dropdown-item>
          <el-dropdown-item :icon="Close" @click="closeAll">关闭全部</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
  import type { RouteLocationNormalizedLoaded, RouteRecordName } from 'vue-router';

  import { remove, findIndex } from 'lodash-es';
  import { useRouter } from 'vue-router';
  import { Refresh, Close, Back, Right } from '@element-plus/icons-vue';
  import { REDIRECT_NAME } from '/@/router/routes/index';
  import { PageEnum } from '/@/settings/config';

  const router = useRouter();
  const realRoutesName = ref<RouteRecordName[]>([]);
  const tablist = ref<RouteLocationNormalizedLoaded[]>([]);
  const currentName = ref();
  router.getRoutes().forEach((ele) => {
    if (/-component$/.test(ele.name as string)) {
      realRoutesName.value.push(ele.name as string);
    }
  });

  watchEffect(() => {
    currentName.value = router.currentRoute.value.name as string;
    if (realRoutesName.value.includes(`${currentName.value}-component`)) {
      if (findIndex(tablist.value, ['name', currentName.value]) === -1) {
        console.log(currentName.value);
        tablist.value.push(router.currentRoute.value);
      }
    }
    if (tablist.value.length === 0) {
      console.log(currentName.value);
      tablist.value.push(router.currentRoute.value);
    }
  });
  /** 刷新页面 */
  const refreshPage = () => {
    const { replace, currentRoute } = router || useRouter();
    const { query, name, fullPath } = unref(currentRoute.value);
    if (name === REDIRECT_NAME) return;
    query['_redirect_type'] = 'path';
    query['path'] = fullPath;
    replace({ name: REDIRECT_NAME, query });
  };
  /** 关闭其他 */
  const closeOther = () => {
    tablist.value = [];
  };
  /** 关闭左侧 */
  const closeLeft = () => {
    findIndex(tablist.value, ['name', currentName.value]);
    const index = findIndex(tablist.value, ['name', currentName.value]);
    tablist.value.splice(0, index);
  };
  /** 关闭右侧 */
  const closeRight = () => {
    const index = findIndex(tablist.value, ['name', currentName.value]);
    tablist.value = tablist.value.slice(index + 1, tablist.value.length);
  };
  /** 关闭全部 */
  const closeAll = async () => {
    await router.push({ path: PageEnum.BASE_HOME });
    tablist.value = [];
  };

  const handleTabClick = (e) => {
    router.push({ name: e.props.name });
  };
  const handleTabRemove = (e) => {
    /** 切换到上一个路由, 再删除tab */
    router.back();
    router.afterEach(() => {
      remove(tablist.value, (item) => item.name === e);
    });
  };
</script>

<style lang="scss" scoped>
  .ng-tabs {
    height: 48px;
    ::v-deep(.el-tabs__header) {
      height: 44px;
      margin: 0 8px;
      display: flex;
      border: 0;
      align-items: center;
      .el-tabs__nav {
        border: 0;

        .el-tabs__item {
          margin-right: 8px;
          border: 0;
          height: 32px;
          line-height: 32px;
          border-radius: 4px 4px 0 0;
          &.is-active {
            color: var(--el-color-primary) !important;
            background: var(--el-color-primary-light-9) !important;
          }

          &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 2px;
            background-color: var(--el-color-primary);
            transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), border 0s, color 0.1s,
              font-size 0s;
          }
          &:hover::after {
            width: 100%;
          }
        }
        .is-active.el-tabs__item::after {
          width: 100%;
        }
      }
    }
  }
</style>
