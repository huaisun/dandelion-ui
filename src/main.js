import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import axios from 'axios'
import Vuex from 'vuex'
import { store } from './store/store';

// index.js or main.js
// import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import '@/assets/css/main.css'
import CommonJs from '@/utils/common.js'
import MessageJs from '@/constants/message.js'
import ColorJs from '@/constants/color.js'

Vue.prototype.$axios = axios //全局注册，使用方法为:this.$axios
Vue.config.productionTip = false
Vue.use(Vuex);
Vue.use(CommonJs);
Vue.use(MessageJs);
Vue.use(ColorJs);

new Vue({
    store: store, //使用store
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app')