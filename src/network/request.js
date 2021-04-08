import axios from 'axios'
import Vue from 'vue'

export function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: 'http://119.29.193.127:80',
    // baseURL: 'http://localhost:3000',
 
    // timeout: 5000
  })

  // axios的拦截器
  // 请求拦截
  instance.interceptors.request.use(config => {
    return config
  })

  // 响应拦截
  instance.interceptors.response.use(res => {
    // console.log(res)
    //优化 将所有的错误处理放在响应拦截中
    if (res.status != 200) return Vue.prototype.$message.error("ERROR!");
    return res.data
  })


  // 3.发送真正的网络请求
  return instance(config)
}
