<template>
  <div>
    <el-tabs v-model="editableTabsValue" type="card" editable class="demo-tabs">
      <el-tab-pane
        v-for="item in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      >
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
  const editableTabsValue = ref('2');
  const editableTabs = ref([
    {
      title: 'Tab 1',
      name: '1',
      content: 'Tab 1 content',
    },
    {
      title: 'Tab 2',
      name: '2',
      content: 'Tab 2 content',
    },
    {
      title: 'Tab 3',
      name: '3',
      content: 'Tab 3 content',
    },
    {
      title: 'Tab 4',
      name: '4',
      content: 'Tab 4 content',
    },
  ]);
</script>

<style scoped></style>
