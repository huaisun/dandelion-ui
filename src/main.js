import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
// index.js or main.js
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import '@/assets/main.css'

Vue.config.productionTip = false
new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
