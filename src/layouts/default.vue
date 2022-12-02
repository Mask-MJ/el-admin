<template>
  <el-container class="h-screen">
    <el-aside class="left-aside">
      <el-scrollbar>
        <SideBar v-if="!isMobile" />
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-header class="border-b-1 border-light-600 !px-0" height="100px">
        <Header />
        <Tabs />
      </el-header>
      <el-main class="bg-light-500">
        <el-scrollbar>
          <RouterView />
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
  import SideBar from './sidebar/index.vue';
  import Header from './header/index.vue';
  import Tabs from './tabs/index.vue';
  const isMobile = ref(false);
</script>

<style lang="scss" scoped>
  .left-aside {
    width: auto;
    box-shadow: 2px 0 8px #1d23290d;
    .el-scrollbar__view {
      height: 100%;
    }
  }
</style>
