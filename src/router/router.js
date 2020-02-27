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

//4.创建路由对象
const router = new VueRouter({
    routes: [{
        path: "/login",
        component: login
    }, {
        path: "/index",
        component: index,
        children: [{  //子路由
            path: "user",  //子路由路径不加/
            component: user,
        },{  
            path: "business",  
            component: business,
        },{  
            path: "chart",  
            component: chart,
        },{  
            path: "question",  
            component: question,
        },{  
            path: "subject",  
            component: subject,
        },]
    }]
});

//导航守卫
router.beforeEach((to, from, next) => {
    console.log("before",to,from);
    NProgress.start();
    next();
})
router.afterEach((to, from) => {
    console.log("after",to,from);
    NProgress.done();
})

//5.暴露路由
export default router;