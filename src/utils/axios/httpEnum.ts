/**
 * @description: Request result set
 */
export enum ResultEnum {
  SUCCESS = 200,
  ERROR = 1,
  TIMEOUT = 401,
  TYPE = 'success',
}

/**
 * @description: request method
 */
export enum RequestEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

/**
 * @description: token key
 */
export const TOKEN_KEY = 'TOKEN__';

/**
 * @description:  contentType
 */
export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // form-data qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  upload
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}

export const HttpStatusCode = new Map([
  [401, '用户没有权限（令牌、用户名、密码错误）!'],
  [403, '用户得到授权，但是访问是被禁止的。!'],
  [404, '网络请求错误,未找到该资源!'],
  [405, '网络请求错误,请求方法未允许!'],
  [408, '网络请求超时!'],
  [500, '服务器错误,请联系管理员!'],
  [501, '网络未实现!'],
  [502, '网络错误!'],
  [503, '服务不可用，服务器暂时过载或维护!'],
  [504, '网络超时!'],
  [505, 'http版本不支持该请求!'],
]);
