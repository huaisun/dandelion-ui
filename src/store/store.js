//引入vue和Vuex
import Vue from 'vue'
import Vuex from 'vuex'

//引入之后，对vuex进行引用
Vue.use(Vuex);

//创建且声明一个对象
export const store = new Vuex.Store({
    state: {
        isShow: true,
        items: [{
                name: "张三",
                num: "1"
            },
            {
                name: "李四",
                num: "2"
            },
            {
                name: "王五",
                num: "3"
            }
        ]
    }
})