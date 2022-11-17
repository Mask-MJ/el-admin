import { HttpStatusCode } from './httpEnum';
import { ElMessage } from 'element-plus';

export function checkStatus(status: number, msg: string): void {
  const userStore = useUserStore();
  const errMessage = msg || HttpStatusCode.get(status);

  if (status === 401) {
    // 如果未登录，跳转到登录页面，并携带当前页面的路径
    // 登录成功后返回当前页面。需要在登录页面上操作此步骤。
    userStore.state.token = null;
    userStore.logout();
  }

  errMessage && ElMessage.error(errMessage);
}
