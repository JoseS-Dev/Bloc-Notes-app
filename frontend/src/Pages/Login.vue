<script setup lang="ts">
    import {ref} from 'vue';
    import { useRouter } from 'vue-router';
    // References
    const email_user = ref('');
    const password_user = ref('');
    const router = useRouter();
</script>

<template>
    <main class="w-full h-screen flex flex-col justify-center items-center">
        <form class="border-2 bg-gray-700 border-gray-800 w-1/4 h-3/5 flex flex-col items-center p-3 gap-2.5 rounded-2xl">
            <div class="w-full border-b-2 border-blue-600 p-2 flex flex-col items-center">
                <h3 class="text-2xl tracking-normal font-bold">Inicio de Sesión</h3>
            </div>
            <div class="border-b-2 border-blue-600 w-full h-2/6 p-2 flex flex-col justify-center">
                <label for="email_user" class="w-full tracking-wide text-xl font-bold">Email:</label>
                <input
                    type="email"
                    class="border-b-2 border-r-2 border-t-2 border-gray-300 w-full h-16 text-lg px-3 
                    hover:border-blue-500 focus:border-blue-500 outline-none transition-all duration-200
                    placeholder-gray-200"
                    v-model="email_user"
                    id="email_user"
                    placeholder="Ingrese su correo"
                />
            </div>
            <div class="border-b-2 border-blue-600 w-full h-2/6 p-2 flex flex-col justify-center">
                <label for="password_user" class="w-full tracking-wide text-xl font-bold">Password:</label>
                <input
                    type="password"
                    class="border-b-2 border-r-2 border-t-2 border-gray-300 w-full h-16 text-lg px-3 
                    hover:border-blue-500 focus:border-blue-500 outline-none transition-all duration-200
                    placeholder-gray-200"
                    v-model="password_user"
                    placeholder="Ingrese su contraseña"
                />
            </div>
            <div class="w-full h-3/10 p-1 flex flex-col justify-center items-center gap-1">
                <p class="text-gray-300 text-lg">¿No tienes una cuenta? <a @click="router.push('/register')" href="/register" class="text-blue-500">Regístrate</a></p>
                <button
                type="submit" 
                class="w-1/2 h-16 border-2 border-gray-800 text-xl 
                tracking-wide bg-blue-500 text-white font-semibold rounded-2xl cursor-pointer
                hover:bg-blue-300 hover:scale-95 hover:text-black transition-transform duration-200"
                >
                Iniciar Sesión
            </button>
            </div>
        </form>
    </main>
</template>