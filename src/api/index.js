import axios from 'axios'
import { getToken } from'@/utils/token.js'

let indexReq = axios.create({
    baseURL: process.env.VUE_APP_URL,
    headers: { token:getToken() },
})

export function info() {
    return indexReq({
        method:'get',
        url:'/info',
    })
}
export function logout() {
    return indexReq({
        method:'get',
        url: "/logout",
    })
}