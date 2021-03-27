import axios from 'axios'

export function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: 'http://119.29.193.127:80',
    // baseURL: 'http://localhost:3000',
    // baseURL: 'https://nicemusic-api.lxhcool.cn/',
    // timeout: 5000
  })

  // axios的拦截器
  // 请求拦截
  instance.interceptors.request.use(config => {
    return config
  })

  // 响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  })

  // 3.发送真正的网络请求
  return instance(config)
}
