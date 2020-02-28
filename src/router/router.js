//1.导入路由
import VueRouter from "vue-router";
//2.注册路由
import Vue from "vue";
Vue.use(VueRouter);
//3.准备组件
import login from "../views/login/index.vue";
import index from "../views/index/index.vue";
import user from "../views/index/user/user.vue";
import chart from "../views/index/chart/chart.vue";
import business from "../views/index/business/business.vue";
import question from "../views/index/question/question.vue";
import subject from "../views/index/subject/subject.vue";

import NProgress from "nprogress"; //引入插件
import "nprogress/nprogress.css";
import { info } from "../api/index.js";
import { removeToken } from '@/utils/token.js'
import { Message } from 'element-ui';
import store from "../store/store.js"

//4.创建路由对象
const router = new VueRouter({
    routes: [{
        path: "/login",
        component: login,
        meta:{title:'登陆'}
    }, {
        path: "/index",
        component: index,
        meta:{title:"首页"},
        children: [{ //子路由
            path: "user", //子路由路径不加/
            component: user,
            meta:{title:"用户列表"}
        }, {
            path: "business",
            component: business,
            meta:{title:"企业列表"}
        }, {
            path: "chart",
            component: chart,
            meta:{title:"数据概览"}
        }, {
            path: "question",
            component: question,
            meta:{title:"题库列表"}
        }, {
            path: "subject",
            component: subject,
            meta:{title:"学科列表"}
        }, ]
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
                //修改vuex的数据
                store.commit('getUserName',res.data.data.username);
                store.commit('getAvatar',process.env.VUE_APP_URL + "/" + res.data.data.avatar);
                next();
            } else if (res.data.code == 206) {
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