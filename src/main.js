import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import axios from 'axios'

// index.js or main.js
// import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import '@/assets/main.css'
import CommonJs from '@/assets/common.js'
import MessageJs from '@/assets/message.js'
import ColorJs from '@/assets/color.js'

Vue.prototype.$axios = axios    //全局注册，使用方法为:this.$axios
Vue.config.productionTip = false
Vue.use(CommonJs);
Vue.use(MessageJs);
Vue.use(ColorJs);

new Vue({
    router,
    vuetify,    
    render: h => h(App)
}).$mount('#app')