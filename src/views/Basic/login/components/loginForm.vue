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

  const userStore = useUserStore();
  const pictureCode = reactive({
    uuid: '',
    img: '',
  });
  const imgDom = observer(
    defineComponent({
      name: 'PicCode',
      setup() {
        return () =>
          h(ElImage, {
            width: '106',
            fit: 'cover',
            src: pictureCode.img,
            onClick: () => handleStart(),
          });
      },
    }),
  );

  const handleStart = async () => {
    const { uuid, img } = await getPictureCode();
    pictureCode.uuid = uuid;
    pictureCode.img = `data:image/gif;base64,${img}`;
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

  const onSubmit = async (value) => {
    const userInfo = await userStore.login({ uuid: pictureCode.uuid, ...value });
    if (userInfo) {
      ElNotification.success({
        title: '登录成功',
        message: `欢迎回来: ${userInfo.user.nickName}`,
        duration: 3,
      });
    }
  };
</script>

<style lang="scss" scoped>
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
