<template>
  <el-config-provider :locale="locale">
    <router-view />
    <el-button type="primary" size="default" @click="">asdasd</el-button>
  </el-config-provider>
</template>

<script setup lang="ts">
  import zhCn from 'element-plus/lib/locale/lang/zh-cn';
  const locale = zhCn;
</script>

<style>
  /* #app {
    text-align: center;
    color: var(--ep-text-color-primary);
  }

  .element-plus-logo {
    width: 50%;
  } */
</style>
