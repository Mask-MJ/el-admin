<template>
  <div>
    <el-tabs
      class="ng-tabs"
      v-model="tabActive"
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
          <span v-if="item.meta && item.meta.title">
            {{ item.meta.title }}
          </span>
        </template>
      </el-tab-pane>
    </el-tabs>
    <el-dropdown trigger="contextmenu">
      <span class="el-dropdown-link">
        Dropdown List<el-icon class="el-icon--right"><arrow-down /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item :icon="Plus">Action 1</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
  import { type RouteLocationNormalizedLoaded, type RouteRecordName, useRouter } from 'vue-router';
  const router = useRouter();
  const realRoutesName = ref<RouteRecordName[]>([]);
  const tablist = ref<RouteLocationNormalizedLoaded[]>([]);
  const tabActive = ref();

  router.getRoutes().forEach((ele) => {
    if (/-component$/.test(ele.name as string)) {
      realRoutesName.value.push(ele.name as string);
    }
  });

  watchEffect(() => {
    const name = router.currentRoute.value.name as string;
    if (realRoutesName.value.includes(`${name}-component`)) {
      tabActive.value = name;
      tablist.value.push(router.currentRoute.value);
      console.log(tablist);
      console.log(realRoutesName);
    }
  });

  const handleTabClick = () => {};
  const handleTabRemove = () => {};
</script>

<style scoped></style>
