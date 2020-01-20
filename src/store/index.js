//引入vue和Vuex
import Vue from 'vue'
import Vuex from 'vuex'

//引入之后，对vuex进行引用
Vue.use(Vuex);

// 全局
import state from './state'
import mutations from './mutations'
import actions from './actions'

// 模块
import Domain from './domain';

//创建且声明一个对象
export const store = new Vuex.Store({
    state,
    mutations,
    actions,
    modules: {
        domain: Domain,
    }
})