import Vue from 'vue'
import VueRouter from 'vue-router'
import Active from '../views/Active'

// 主页
import Home from '../views/home/Home'

// 入口
import Entrance from '../views/domain/Entrance'

// 404
import FourZeroFour from '../views/common/404'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
}, {
    path: '/active',
    name: 'active',
    component: Active
}, {
    path: '/404',
    name: 're-404',
    component: FourZeroFour
}, {
    path: '/:domain',
    name: 'domain',
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