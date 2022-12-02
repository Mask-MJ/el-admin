<template>
  <div class="flex justify-between h-15 border-b-1 border-light-700">
    <div class="icon-btn" @click="appStore.changeCollapse">
      <i :class="collapseIcon" class="w-6 h-6"></i>
    </div>
    <div class="flex">
      <el-tooltip effect="dark" :content="t('header.search')" placement="bottom">
        <div class="icon-btn">
          <i class="i-ep:search w-6 h-6" />
        </div>
      </el-tooltip>
      <el-tooltip effect="dark" :content="t('header.tooltipEntryFull')" placement="bottom">
        <div class="icon-btn"> <i class="i-ep:full-screen w-6 h-6" /> </div>
      </el-tooltip>
      <el-tooltip effect="dark" :content="t('header.tooltipNotify')" placement="bottom">
        <div class="icon-btn">
          <i class="i-ep:bell w-6 h-6" />
        </div>
      </el-tooltip>
      <el-dropdown>
        <div class="icon-btn"> <img class="w-6 h-6" src="/images/basic/language.svg" /> </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item> 简体中文 </el-dropdown-item>
            <el-dropdown-item> English </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-dropdown>
        <div class="flex items-center px-2 hover:bg-light-400 cursor-pointer">
          <el-avatar class="!w-8 !h-8 mr-2" :src="avatarImg" />
          <span>{{ userInfo?.nickName }}</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <el-icon><span class="i-ep:user"></span></el-icon>
              {{ t('header.userInfo') }}
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon><span class="i-ep:switch-button"></span></el-icon>
              {{ t('header.dropdownItemLoginOut') }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <div class="icon-btn"> <i class="i-ep:setting w-6 h-6" /> </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { isDevMode } from '/@/utils/env';
  const { t } = useI18n();
  const appStore = useAppStore();
  const userStore = useUserStore();
  const userInfo = computed(() => userStore.getUserInfo());
  const collapseIcon = computed(() => (appStore.state.collapse ? 'i-ep:expand' : 'i-ep:fold'));
  const avatarImg = computed(() =>
    isDevMode() ? '/images/basic/header.jpg' : userInfo.value?.avatar,
  );
</script>

<style scoped></style>
