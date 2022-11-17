export interface GetUserInfoModel {
  user: { nickName: string; avatar: string; userName: string };
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
