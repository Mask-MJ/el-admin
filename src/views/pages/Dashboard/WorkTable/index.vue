<template>
  <el-table :data="tableData">
    <el-table-column prop="date" label="Date" width="140" />
    <el-table-column prop="name" label="Name" width="120" />
    <el-table-column prop="address" label="Address" />
  </el-table>
</template>

<script setup lang="ts">
  const item = {
    date: '20113-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  };
  const tableData = ref(Array.from({ length: 50 }).fill(item));
</script>

<style scoped></style>
