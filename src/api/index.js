import axios from 'axios'
import {
    getToken
} from '@/utils/token.js'

let indexReq = axios.create({
    baseURL: process.env.VUE_APP_URL,
    // headers: { token:getToken() },
})

//axios请求拦截
indexReq.interceptors.request.use(config => {
    config.headers.token = getToken();
    return config;
}, error => {
    return Promise.reject(error);
});
//获取用户信息
export function info() {
    return indexReq({
        method: 'get',
        url: '/info',
    })
}
//退出登录
export function logout() {
    return indexReq({
        method: 'get',
        url: "/logout",
    })
}