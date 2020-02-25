const TOKENKEY = 'hmmmtoken'
//获取token
export function getToken() {
    return window.localStorage.getItem(TOKENKEY);
}
//设置,保存token
export function setToken(token) {
    window.localStorage.setItem(TOKENKEY,token);
}
//删除token
export function removeToken() {
    window.localStorage.removeItem(TOKENKEY);
}
