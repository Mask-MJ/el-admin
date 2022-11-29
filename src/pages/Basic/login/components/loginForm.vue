<template>
  <div class="loginForm">
    <div class="text-2xl font-bold mb-6">登陆</div>
    <FormProvider :form="form">
      <SchemaField :schema="schema" />
      <Submit class="w-full" size="large" @submit="onSubmit">提交</Submit>
    </FormProvider>
  </div>
</template>

<script setup lang="ts">
  import { createForm } from '@formily/core';
  import { createSchemaField, FormProvider } from '@formily/vue';
  import { observer } from '@formily/reactive-vue';
  import { FormItem, Submit, FormLayout, Input, Password, Checkbox } from '@formily/element-plus';
  import { ElImage } from 'element-plus';
  import { getPictureCode } from '/@/api/basic/user';

  const uuid = ref();
  const img = ref();
  const imgDom = observer(
    defineComponent({
      name: 'PicCode',
      setup() {
        return () =>
          h(ElImage, {
            width: '106px',
            height: '40px',
            preview: false,
            src: img.value,
            onClick: () => handleStart(),
          });
      },
    }),
  );

  const handleStart = async () => {
    const pictureCode = await getPictureCode();
    console.log(pictureCode);
    uuid.value = pictureCode.uuid;
    img.value = `data:image/gif;base64,${pictureCode.img}`;
  };

  watchEffect(() => {
    handleStart();
  });

  const form = createForm();
  const schema = {
    type: 'object',
    properties: {
      layout: {
        type: 'void',
        'x-component': 'FormLayout',
        className: 'mb-14',
        properties: {
          username: {
            type: 'string',
            default: 'admin',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-component-props': { placeholder: '账号', size: 'large' },
            'x-validator': [{ required: true, message: '账号不能为空' }],
          },
          password: {
            type: 'string',
            default: 'admin123',
            'x-decorator': 'FormItem',
            'x-component': 'Password',
            'x-component-props': { placeholder: '密码', size: 'large' },
            'x-validator': [{ required: true, message: '密码不能为空' }],
          },
          picCode: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-component-props': { placeholder: '图片验证码', size: 'large' },
            'x-validator': [{ required: true, message: '验证码不能为空' }],
            'x-decorator-props': { addonAfter: imgDom, bordered: true },
          },
          checkboxGroup: {
            type: 'boolean',
            'x-decorator': 'FormItem',
            'x-component': 'Checkbox.Group',
            enum: [{ label: '记住我', value: true }],
          },
        },
      },
    },
  };

  const { SchemaField } = createSchemaField({
    components: { FormLayout, FormItem, Input, Password, Image, imgDom, Checkbox },
  });

  const onSubmit = (value) => {
    console.log(value);
  };
</script>

<style scoped>
  .loginForm {
    position: absolute;
    top: calc(50% - 250px);
    right: 10%;
    background-color: #fff;
    width: 350px;
    height: 450px;
    border-radius: 24px;
    padding: 32px 24px;
  }
</style>
