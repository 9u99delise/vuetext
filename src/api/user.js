import request from '@/utils/request.js'
//用户列表
export function userList(params){
    return request({
        method:"get",
        url:"/user/list",
        params,
    })
}
//创建用户
export function userAdd(data){
    return request({
        method:"post",
        url:"/user/add",
        data,
    })
}
//用户状态
export function userStatus(data){
    return request({
        method:"post",
        url:"/user/status",
        data,
    })
}
//删除用户
export function userRemove(data){
    return request({
        method:"post",
        url:"/user/remove",
        data,
    })
}
//编辑用户
export function userEdit(data){
    return request({
        method:"post",
        url:"/user/edit",
        data,
    })
}
