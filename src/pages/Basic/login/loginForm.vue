<template>
  <div class="w-100 h-120 bg-white">
    <el-input v-model="input" type="password" placeholder="Please input password" show-password />
    <FormProvider :form="form">
      <SchemaField :schema="schema" />
      <Submit @submit="onSubmit">提交</Submit>
    </FormProvider>
  </div>
</template>

<script setup lang="ts">
  import { createForm } from '@formily/core';
  import { createSchemaField, FormProvider } from '@formily/vue';
  import { FormItem, Submit, FormGrid, Input } from '@formily/element-plus';

  const input = ref('');
  const form = createForm();
  const schema = {
    type: 'object',
    properties: {
      userName: {
        type: 'string',
        title: '用户名',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
      },
      password: {
        type: 'string',
        title: '密码',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
      },
    },
  };

  const { SchemaField } = createSchemaField({
    components: {
      FormItem,
      FormGrid,
      Input,
    },
  });

  const onSubmit = (value) => {
    console.log(value);
  };
</script>

<style scoped></style>
