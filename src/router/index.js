import Vue from 'vue'
import VueRouter from 'vue-router'
import Active from '../views/com/Active'

// 主页
import Home from '../views/home/Home'

// 入口
import Entrance from '../views/domain/Entrance'
import Mine from '../views/domain/mine/Mine'

// 404
import FourZeroFour from '../views/com/404'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
}, {
    path: '/sign',
    name: 'Sign',
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
    component: Entrance,
    children: [
        {
            path: '/',
            name: 'mine',
            component: Mine,
        }
    ]
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