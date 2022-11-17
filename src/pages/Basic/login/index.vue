<template>
  <div class="bg-black w-screen h-screen">
    <LoginForm />
    <!-- <el-input v-model="d" placeholder="" size="normal" clearable @change=""></el-input> -->
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import LoginForm from './loginForm.vue';
  const d = ref('');
  const router = useRouter();
  console.log(router);
</script>

<style scoped></style>
