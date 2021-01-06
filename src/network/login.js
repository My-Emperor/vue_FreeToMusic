import {request} from "./request"

/**
 * 通过手机与密码登录
 * @param phone 手机号码
 * @param password 密码
 * @returns {AxiosPromise}
 */
export function loginByPhone(phone,password) {
  return request({
    url:"/login/cellphone",
    method:"post",
    data:{
      phone,
      password
    }
  });
}

export function getLoginStatus() {
  return request({
    url:"/login/cellphone",
  });
}

export function logout() {
  return request({
    url:"/login/cellphone",
  });
}

