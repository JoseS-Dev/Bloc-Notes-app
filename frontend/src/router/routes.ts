import {createRouter, createWebHistory} from "vue-router";

import Home from "../Pages/Home.vue";
import Login from "../Pages/Login.vue";
import Register from "../Pages/Register.vue";
import Settings from "../Pages/Settings.vue";

const router = createRouter({
    history: createWebHistory(`${import.meta.env.BASE_URL}`),
    routes: [
        {
            path: '/',
            name: "Login",
            component: Login
        },
        {
            path: '/home',
            name: "Home",
            component: Home
        },
        {
            path: '/register',
            name: "Register",
            component: Register
        },
        {
            path: '/settings',
            name: "Settings",
            component: Settings
        }
    ]
})

export default router;