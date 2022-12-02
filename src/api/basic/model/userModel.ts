export interface GetUserInfoModel {
  user: UserInfo;
}

export interface UserInfo {
  admin: boolean;
  avatar: string;
  userId: string | number;
  username: string;
  realName: string;
  desc?: string;
  homePath?: string;
  beginTime: string | null;
  createBy: string;
  createTime: string;
  dataScope: null;
  delFlag: string;
  deptId: string | null;
  email: string | null;
  endTime: string | null;
  loginDate: string | null;
  loginIp: string | null;
  nickName: string | null;
  password: string | null;
  phonenumber: string | null;
  postIds: string | null;
  remark: string | null;
  roleId: string | null;
  roleIds: string | null;
  roles: any[];
  searchValue: null;
  sex: string | null;
  status: string | null;
  updateBy: null;
  updateTime: null;
  userName: string;
}

export interface LoginParams {
  username: string;
  password: string;
  code: string;
  uuid: string;
}

export interface LoginResultModel {
  access_token: string;
  expires_in: number;
}

export interface GetPictureModel {
  captchaOnOff: boolean;
  code: number;
  img: string;
  msg: string;
  uuid: string;
}
