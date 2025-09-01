import { defineStore } from "pinia";
import {ref, computed} from "vue";
import type { UserData } from "../Types/User";



export const useAuthUserStore = defineStore("auth", () => {
    const user = ref(JSON.parse(localStorage.getItem("user") || "null"));
    const token = ref(localStorage.getItem("token"));
    const isAuthenticated = computed(() => !!user.value && !!token.value);

    // Funcion que modifica el usuario y el token
    function setAuthData(newUser: UserData, newToken: string){
        if(!newUser || !newToken) return;
        user.value = newUser;
        token.value = newToken;
        localStorage.setItem("user", JSON.stringify(newUser));
        localStorage.setItem("token", newToken);

    }

    // Funcion que limpia el usuario y el token
    function clearAuthData(){
        user.value = null;
        token.value = null;
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    }

    return {
        user,
        token,
        isAuthenticated: computed(() => isAuthenticated.value),
        setAuthData,
        clearAuthData,
    }
})