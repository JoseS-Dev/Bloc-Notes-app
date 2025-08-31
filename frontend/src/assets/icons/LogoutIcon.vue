<script setup lang="ts">
    import { LogoutUser } from '../../Services/User';
    import { useRouter } from 'vue-router';
    import { useAuthUserStore } from '../../Store/authUserStore';
    import Swal from 'sweetalert2';
    const emailUser = JSON.parse(localStorage.getItem('user') || '{}').email_user;
    const router = useRouter();
    const authUserStore = useAuthUserStore();

    // Function to handle to logout a user
    const handleLogout = async (e: Event) => {
        e.preventDefault();
        if(!emailUser) console.log("No existe");
        try{
            const response = await LogoutUser(emailUser);
            if(response.message){
                await Swal.fire({
                    icon: 'success',
                    title: 'Cierre de sesión exitoso',
                    text: `Vuelve pronto!`
                })
                authUserStore.clearAuthData();
                router.push('/');
            }
        }
        catch(error){
            console.log(error);
            await Swal.fire({
                icon: 'error',
                title: 'Error en el cierre de sesión',
                text: `Hubo un problema al cerrar sesión`
            })
        }
    }
</script>

<template>
    <svg @click="handleLogout" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
    class="lucide lucide-log-out-icon lucide-log-out hover:stroke-blue-600 hover:scale-105 cursor-pointer transition-transform duration-200">
        <path d="m16 17 5-5-5-5"/>
        <path d="M21 12H9"/>
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    </svg>
</template>