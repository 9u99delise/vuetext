//导入组件
import user from "../views/index/user/user.vue";
import chart from "../views/index/chart/chart.vue";
import business from "../views/index/business/business.vue";
import question from "../views/index/question/question.vue";
import subject from "../views/index/subject/subject.vue";

export default [{ //子路由

    path: "chart",
    component: chart,
    meta: {
        title: "数据概览",
        icon: "el-icon-pie-chart",
        roles: ['超级管理员', '管理员']
    }

}, {
    path: "user", //子路由路径不加/
    component: user,
    meta: {
        title: "用户列表",
        icon: "el-icon-user",
        roles: ['超级管理员', '管理员']
    }
}, {
    path: "question",
    component: question,
    meta: {
        title: "题库列表",
        icon: "el-icon-edit-outline",
        roles: ['超级管理员', '管理员', '老师', '学生']
    }
}, {
    path: "business",
    component: business,
    meta: {
        title: "企业列表",
        icon: "el-icon-office-building",
        roles: ['超级管理员', '管理员', '老师']
    }
}, {
    path: "subject",
    component: subject,
    meta: {
        title: "学科列表",
        icon: "el-icon-notebook-2",
        roles: ['超级管理员', '管理员', '老师', '学生']
    }
}, ]