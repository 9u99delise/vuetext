//1.导入路由
import VueRouter from "vue-router";
//2.注册路由
import Vue from "vue";
Vue.use(VueRouter);
//3.准备组件
import login from "../views/login/index.vue";
import index from "../views/index/index.vue";


import NProgress from "nprogress"; //引入插件
import "nprogress/nprogress.css";
import { info } from "../api/index.js";
import { removeToken } from '@/utils/token.js'
import { Message } from 'element-ui';
import store from "../store/store.js"

import children from './childrenRoutes.js'
//4.创建路由对象
const router = new VueRouter({
    routes: [{
        path: "/login",
        component: login,
        meta:{title:'登陆',roles:['超级管理员','管理员','老师','学生']}
    }, {
        path: "/index",
        component: index,
        meta:{title:"首页",roles:['超级管理员','管理员','老师','学生']},
        children,
    },{
        path: "/",
        redirect: "/login",
    },]
});

// //导航守卫
let whileUrl = ['/login','/guanggao']  //路由白名单
router.beforeEach((to, from, next) => {
    // console.log("before", to, from);
    NProgress.start();
    if (whileUrl.includes(to.path)) {  //白名单判断
        next();
    } else {
        info().then(res => {
            if (res.data.code == 200) {
                //账号状态启用才放行
                if(res.data.data.status == 1){
                    //修改vuex的数据
                    store.commit('getUserName',res.data.data.username);
                    store.commit('getAvatar',process.env.VUE_APP_URL + "/" + res.data.data.avatar);
                    store.commit('changeRole',res.data.data.role);
                    if(from.path == "/login"){
                        Message.success("登陆成功!");
                    }
                    //判断账号是否有权限访问要去的页面 to.meta.roles 得到哪些角色可去此页面
                    if(to.meta.roles.includes(res.data.data.role)){
                        next();
                    }else{
                        Message.warning("该页面没有权限访问");
                        NProgress.done();
                        next(from.path);
                    }
                }else{
                    Message.warning('账号被禁用,请与管理员联系');
                    next('/login');
                    NProgress.done();
                }
            } else{
                Message.error('登陆状态异常,请重新登陆')
                removeToken();
                NProgress.done();  //手动完成进度条
                next('/login');
            }
        })  
    }
})
router.afterEach((to) => {
    // console.log("after",to,from)
    document.title = to.meta.title;
    NProgress.done();
})

//5.暴露路由
export default router;