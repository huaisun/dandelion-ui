import Vue from 'vue'
import VueRouter from 'vue-router'

// 主页
import Login from '../views/home/Login'
import Register from '../views/home/Register'

// 入口
import Entrance from '../views/domain/Entrance'

// 404
import FourZeroFour from '../views/com/404'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'login',
    component: Login,
}, {
    path: '/sign-up',
    name: 'register',
    component: Register
}, {
    path: '/404',
    name: 're-404',
    component: FourZeroFour
}, {
    path: '/:domain',
    component: Entrance,
}, {
    path: '*',
    name: '404',
    component: FourZeroFour
}]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router