import {http} from "@/utils/http"

/**
 * 登录login
 * @param *phone
 * @param *password
 * @param countrycode
 * @param md5_password
 * @param captcha
 * @returns {AxiosPromise}
 */
export function login(phone, password, captcha, countrycode, md5_password,realIP='116.25.146.177') {
    return http({
        url: "/login/cellphone",
        params: {
            phone, password, captcha, countrycode, md5_password,realIP
        }
    })
}

/**
 * 发送验证码
 * @param phone
 * @returns {AxiosPromise}
 */
export function sendCode(phone) {
    return http({
        url: "/captcha/sent",
        params: {
            phone
        }
    })
}