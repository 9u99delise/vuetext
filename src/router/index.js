//1.导入路由
import VueRouter from "vue-router";
//2.注册路由
import Vue from "vue";
Vue.use(VueRouter);
//3.准备组件
import login from "../views/login/index.vue";
//4.创建路由对象
const router = new VueRouter({
    routes: [{
        path: "/login",
        component: login
    }]
});
//5.暴露路由
export default router;