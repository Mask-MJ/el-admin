<template>
  <div class="relative">
    <Earth />
    <LoginForm />
    <!-- <el-button type="primary" size="default" @click="toggleDark()">222</el-button> -->
  </div>
</template>

<script setup lang="ts">
  import Earth from './components/Earth/index.vue';
  import LoginForm from './components/loginForm.vue';
  // const isDark = useDark();
  // const toggleDark = useToggle(isDark);
</script>

<style scoped></style>
