import request from '@/utils/request.js'

 //封装接口学科列表
 export function subjectList(params){
     return request({
         method:"get",
         url:"/subject/list",
         params,
     })
 }
 //封装学科状态接口
 export function subjectStatus(data){
     return request({
         method:"post",
         url:"/subject/status",
         data,
     })
 }
 //封装添加学科接口
 export function subjectAdd(data){
        return request({
            method:"post",
            url:"/subject/add",
            data,
        })
 }
 //封装编辑学科接口
 export function subjectEdit(data){
     return request({
         method:"post",
         url:"/subject/edit",
         data,
     })
 }
 //封装删除接口
 export function subjectRemove(data){
    return request({
        method:"post",
        url:"/subject/remove",
        data,
    })
}
