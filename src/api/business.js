import request from '@/utils/request.js'

//企业列表
export function businessList(params) {
    return request({
        method: "get",
        url: "/enterprise/list",
        params,
    })
}
//企业添加
export function businessAdd(data) {
    return request({
        method: "post",
        url: "/enterprise/add",
        data,
    })
}
//企业状态
export function businessStatus(data) {
    return request({
        method: "post",
        url: "/enterprise/status",
        data,
    })
}
//企业删除
export function businessRemove(data) {
    return request({
        method: "post",
        url: "/enterprise/remove",
        data,
    })
}
//企业编辑
export function businessEdit(data) {
    return request({
        method: "post",
        url: "/enterprise/edit",
        data,
    })
}