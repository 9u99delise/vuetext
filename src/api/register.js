import axios from 'axios'
//短信接口
export function getPhoneMsg(data) { 
    return axios({
        method: "post",
        url: process.env.VUE_APP_URL + "/sendsms",
        data,
        withCredentials: true, //跨域携带cookie
    })
}
//注册接口
export function register(data) {  
    return axios({
        method: 'post',
        url: process.env.VUE_APP_URL + "/register",
        data,
        withCredentials: true,
    })
}