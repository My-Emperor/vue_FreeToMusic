import axios from 'axios'
import global from '../../global'
//varlet消息提示组件
import { Snackbar } from '@varlet/ui'
import store from '../store'
console.log(store)
let requestIndex = 0;
export function http(config) {
    // 1.创建axios的实例
    const instance = axios.create({
        baseURL: global.BASE_URL,
        timeout: 5000
    })

    // axios的拦截器
    // 请求拦截
    console.log(store.state.loadingFlag)
    instance.interceptors.request.use(config => {
        console.log("请求拦截---:",config);
        if (!store.state.loadingFlag && requestIndex == 0){
            store.commit('updateLoadingFlag',true);
        }
        requestIndex++;
        return config
    })

    // 响应拦截
    instance.interceptors.response.use(res => {
        requestIndex--;
        if (requestIndex == 0){
            store.commit('updateLoadingFlag',false);
        }
        console.log("响应拦截---:",res);
        if (res.data.code != 200){
            return res.data.msg
        }else{
            return res.data
        }
    })


    // 3.发送真正的网络请求
    return instance(config)
}
