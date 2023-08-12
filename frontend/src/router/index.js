import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from "@/views/Auth";
import HomePage from "@/views/HomePage";
import AboutView from "@/views/AboutView"
import store from "@/store"
import Routes from "@/views/Routes.vue";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePage,
        beforeEnter(to, from, next) {
            if (localStorage.getItem('token')) {
                next()
            } else {
                next("/auth")
            }
        }
    },
    {
        path: '/about',
        name: 'about',
        component: AboutView,
        beforeEnter(to, from, next) {
            if (localStorage.getItem('token')) {
                next()
            } else {
                next("/auth")
            }
        }
    },
    {
        path: '/auth',
        name: 'auth',
        component: Auth,
    },
    {
        path: '/routes',
        name: 'routes',
        component: Routes,
        beforeEnter(to, from, next) {
            if (localStorage.getItem('token')) {
                next()
            } else {
                next("/auth")
            }
        }
    },

]

const router = new VueRouter({
    mode: 'history',
    routes
})


export default router