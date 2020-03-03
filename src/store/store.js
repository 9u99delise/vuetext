//导入
import Vuex from 'vuex'
import Vue from 'vue'
//注册
Vue.use(Vuex)
//实例化
const store = new Vuex.Store({
    state:{ 
        userName:'',
        avatar:'',
        role:'', //角色
     },
    mutations:{ 
        getUserName(state,val){
            state.userName = val;
        },
        getAvatar(state,val){
            state.avatar = val;
        },
        changeRole(state,val){
            state.role = val;
        }
     },
})
//暴露store
export default store;  