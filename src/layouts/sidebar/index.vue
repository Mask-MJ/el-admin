<template>
  <el-menu default-active="2" class="el-menu-vertical" :collapse="appStore.state.collapse">
    <el-sub-menu v-for="list in menuData" :index="list.name">
      <template #title>
        <el-icon><i :class="`i-${list.meta?.icon}`"></i></el-icon>
        <span>{{ list.meta?.title }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item v-for="item in list.children" :index="item.name">
          <el-icon><i :class="`i-${item.meta?.icon}`"></i></el-icon>
          <span>{{ item.meta.title }}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>

<script setup lang="ts">
  const appStore = useAppStore();
  const permissionStore = usePermissionStore();
  const menuData = computed(() => permissionStore.getMenu());
</script>

<style lang="scss" scoped>
  .el-menu:not(.el-menu--collapse) {
    width: 210px; // todo: 侧边栏的宽度
  }

  .el-menu {
    border: none;
    height: 100%;
    ::v-deep(.el-menu-item) {
      padding-right: 20px;
    }
    ::v-deep(.el-menu-item),
    ::v-deep(.el-sub-menu),
    ::v-deep(.el-sub-menu__title) {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      & > .el-sub-menu__icon-arrow {
        position: absolute;
        right: 8px;
      }
    }
  }
</style>
