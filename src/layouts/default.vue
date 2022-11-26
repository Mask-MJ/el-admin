<template>
  <el-container class="h-screen">
    <el-aside class="bg-gray-400" v-if="!isMobile">
      <SideBar />
    </el-aside>
    <el-container>
      <el-header class="bg-gray-500">Header</el-header>
      <el-main>
        <el-scrollbar>
          <RouterView />
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
  import SideBar from './sidebar/index.vue';
  const isMobile = ref(false);
</script>

<style scoped></style>
