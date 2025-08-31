import { defineStore } from "pinia";
import {ref, computed} from "vue";
import type { UserData } from "../Types/User";
import { VerifyToken } from "../Services/User";


export const useAuthUserStore = defineStore("auth", () => {
    const user = ref(JSON.parse(localStorage.getItem("user") || "null"));
    const token = ref(localStorage.getItem("token"));
    const isAuthenticated = ref(false);
    const isChecking = ref(false);

    //Function para verificar si el token es valido
    const checkAuth = async () => {
        if(isChecking.value) return isAuthenticated.value;
        isChecking.value = true;
        try{
            if(!token.value){
                isAuthenticated.value = false;
                return false;
            }
            const result = await VerifyToken(token.value);
            isAuthenticated.value = result.isAuthenticated;

            // Se verifica si el resultado es True
            if(!result.isAuthenticated){
                clearAuthData();
            }
            return isAuthenticated.value;
        }
        catch (error) {
            isAuthenticated.value = false;
            return false;
        }
        finally{
            isChecking.value = false;
        }
    }
    checkAuth();

    // Funcion que modifica el usuario y el token
    function setAuthData(newUser: UserData, newToken: string){
        if(!newUser || !newToken) return;
        user.value = newUser;
        token.value = newToken;
        isAuthenticated.value = true;
        localStorage.setItem("user", JSON.stringify(newUser));
        localStorage.setItem("token", newToken);

        checkAuth();
    }

    // Funcion que limpia el usuario y el token
    function clearAuthData(){
        user.value = null;
        token.value = null;
        isAuthenticated.value = false;
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    }

    return {
        user,
        token,
        isAuthenticated: computed(() => isAuthenticated.value),
        isChecking: computed(() => isChecking.value),
        checkAuth,
        setAuthData,
        clearAuthData,
    }
})