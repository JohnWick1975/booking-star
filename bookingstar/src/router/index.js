import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import firebase from "firebase/app";
import 'firebase/auth'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login,
        meta: {
            requiredAnon: true
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue'),
        meta: {
            requiredAnon: true
        }
    },
    {
        path: '/projects',
        name: 'Projects',
        component: () => import(/* webpackChunkName: "projects" */ '../views/Projects.vue'),
        meta: {
            requiredAuth: true
        }
    },
    {
        path: '/properties',
        name: 'Properties',
        component: () => import(/* webpackChunkName: "properties" */ '../views/Properties.vue'),
        meta: {
            requiredAuth: true
        }
    },
    {
        path: '/house/id/:id',
        name: 'House',
        component: () => import(/* webpackChunkName: "house" */ '../views/House.vue'),
        meta: {
            requiredAuth: true
        }
    },
    {
        path: '/edit/id/:id',
        name: 'Edit',
        component: () => import(/* webpackChunkName: "edit" */ '../views/Edit.vue'),
        meta: {
            requiredAuth: true
        }
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    firebase.auth().onAuthStateChanged(user => {
        if (user && to.matched.some(record => record.meta.requiredAnon)) {
            next({
                path: "/projects"
            });
        } else if (!user && to.matched.some(record => record.meta.requiredAuth)) {
            next({
                path: '/'
            });
        } else {
            next();
        }

    });
});

export default router
