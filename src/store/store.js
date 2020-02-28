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
     },
    mutations:{ 
        getUserName(state,val){
            state.userName = val;
        },
        getAvatar(state,val){
            state.avatar = val;
        }
     },
})
//暴露store
export default store;  