import Vue from "vue"
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Client from '../views/Client.vue'
import SignUp from '../views/SignUp.vue'
import Dashboard from '../views/Dashboard.vue'
import UserRoles from '../views/UserRoles.vue'
import NewTask from '../views/NewTask.vue'
import store from '../state/index'

Vue.use(VueRouter)

const routes = [
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard
    },
    {
        path: '/user-roles',
        name: 'UserRoles',
        component: UserRoles
    },
    {
        path: '/new-task',
        name: 'NewTask',
        component: NewTask
    },
    {
        path: '/',
        name: 'Client',
        component: Client,
        children: [
            {
                path: '/sign-up',
                name: 'SignUp',
                component: SignUp
            },
            {
                path: '/login',
                name: 'Login',
                component: Login
            },
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    const isAuthenticated = store.getters.isAuthenticated

    if (to.matched.length == 0) {
        if (!isAuthenticated) {
            next({name: 'Login'})
        } else {
            next({name: 'Dashboard'})
        }
        
    }

    if (to.name !== 'Login' && to.name !== 'SignUp' && !isAuthenticated) next({ name: 'Login' })
    else next()
})

export default router