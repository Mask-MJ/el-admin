<template>
  <div></div>
</template>
<script lang="ts" setup>
  import { unref } from 'vue';
  import { useRouter } from 'vue-router';

  const { currentRoute, replace } = useRouter();
  const { query } = unref(currentRoute);
  const { path } = query;
  const _path: string = Array.isArray(path) ? path.join('/') : (path as string);
  replace({ path: _path.startsWith('/') ? _path : '/' + _path });
</script>
