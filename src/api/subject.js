import axios from 'axios'
import { getToken } from '@/utils/token.js'
 let subjectRequest = axios.create({
     baseURL: process.env.VUE_APP_URL,
     withCredentials:true,
 })
 //请求拦截
 subjectRequest.interceptors.request.use(config => {
 // Do something before request is sent
 config.headers.token = getToken();
 return config;
 },error => {
 // Do something with request error
 return Promise.reject(error);
 });

 //封装接口学科列表
 export function subjectList(params){
     return subjectRequest({
         method:"get",
         url:"/subject/list",
         params,
     })
 }
 //封装学科状态接口
 export function subjectStatus(data){
     return subjectRequest({
         method:"post",
         url:"/subject/status",
         data,
     })
 }
 //封装添加学科接口
 export function subjectAdd(data){
        return subjectRequest({
            method:"post",
            url:"/subject/add",
            data,
        })
 }
 //封装编辑学科接口
 export function subjectEdit(data){
     return subjectRequest({
         method:"post",
         url:"/subject/edit",
         data,
     })
 }
 //封装删除接口
 export function subjectRemove(data){
    return subjectRequest({
        method:"post",
        url:"/subject/remove",
        data,
    })
}
