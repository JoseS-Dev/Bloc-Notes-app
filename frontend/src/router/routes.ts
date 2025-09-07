import {createRouter, createWebHistory} from "vue-router";
import { useAuthUserStore } from "../Store/authUserStore";
import Home from "../Pages/Home.vue";
import Login from "../Pages/Login.vue";
import Register from "../Pages/Register.vue";
import Settings from "../Pages/Settings.vue";
import Create from "../Pages/Create.vue";
import Favorites from "../Pages/Favorites.vue";


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
            component: Home,
            meta: {requiresAuth: true}
        },
        {
            path: '/register',
            name: "Register",
            component: Register
        },
        {
            path: '/settings',
            name: "Settings",
            component: Settings,
            meta: {requiresAuth: true}
        },
        {
            path: '/create',
            name: "Create",
            component: Create,
            meta: {requiresAuth: true}
        },
        {
            path: '/favorites',
            name: "Favorites",
            component: Favorites,
            meta: {requiresAuth: true}
        }
    ]
})
router.beforeEach(async (to) => {
    const authUserStore = useAuthUserStore();
    if(to.meta.requiresAuth && !authUserStore.isAuthenticated) return '/';

})


export default router;