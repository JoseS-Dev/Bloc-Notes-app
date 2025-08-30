<script setup lang="ts">
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';

    const router = useRouter();

    // references a input
    const name_user = ref('');
    const last_name_user = ref('');
    const username = ref('');
    const email_user = ref('');
    const password_user = ref('');
</script>

<template>
    <main class="w-full h-screen flex flex-col justify-center items-center">
        <form class="border-2 border-gray-800 w-1/4 h-4/5 p-3 flex flex-col items-center rounded-2xl bg-gray-700 gap-1">
            <div class="w-full border-b-2 border-blue-600 text-center text-2xl">
                <h2 class="tracking-normal font-bold">Registro de Usuario</h2>
            </div>
            <div class="w-full h-1/5 border-b-2 border-blue-600 flex flex-col justify-center p-2">
                <label class="text-lg tracking-wider font-semibold">Nombre</label>
                <input
                    class="w-full border-b-2 border-r-2 border-t-2 border-gray-300 h-12 text-lg px-2 
                    hover:border-blue-500 focus:border-blue-500 outline-none transition-all duration-200
                    placeholder-gray-200"
                    placeholder="Ingrese su nombre"
                    v-model="name_user"
                />
            </div>
            <div class="w-full h-1/5 border-b-2 border-blue-600 flex flex-col justify-center p-2">
                <label class="text-lg tracking-wider font-semibold">Apellido</label>
                <input
                    class="w-full border-b-2 border-r-2 border-t-2 border-gray-300 h-12 text-lg px-2 
                    hover:border-blue-500 focus:border-blue-500 outline-none transition-all duration-200
                    placeholder-gray-200"
                    placeholder="Ingrese su apellido"
                    v-model="last_name_user"
                />
            </div>
            <div class="w-full h-1/5 border-b-2 border-blue-600 flex flex-col justify-center p-2">
                <label class=" text-lg tracking-wider font-semibold">Username</label>
                <input
                    class="w-full border-b-2 border-r-2 border-t-2 border-gray-300 h-12 text-lg px-2 
                    hover:border-blue-500 focus:border-blue-500 outline-none transition-all duration-200
                    placeholder-gray-200"
                    placeholder="Ingrese su nombre de usuario"
                    v-model="username"
                />
            </div>
            <div class="w-full h-1/5 border-b-2 border-blue-600 flex flex-col justify-center p-2">
                <label class="text-lg tracking-wider font-semibold">Email</label>
                <input
                    class="w-full border-b-2 border-r-2 border-t-2 border-gray-300 h-12 text-lg px-2 
                    hover:border-blue-500 focus:border-blue-500 outline-none transition-all duration-200
                    placeholder-gray-200"
                    placeholder="Ingrese su correo"
                    v-model="email_user"
                />
            </div>
            <div class="w-full h-1/5 border-b-2 border-blue-600 flex flex-col justify-center p-2">
                <label class="text-lg tracking-wider font-semibold">Password</label>
                <input
                    class="w-full border-b-2 border-r-2 border-t-2 border-gray-300 h-12 text-lg px-2 
                    hover:border-blue-500 focus:border-blue-500 outline-none transition-all duration-200
                    placeholder-gray-200"
                    placeholder="Ingrese su contraseña"
                    v-model="password_user"
                />
            </div>
            <div class="w-full h-3/10 flex flex-col items-center justify-evenly p-2">
                <span class="text-gray-300 text-lg">¿Ya tienes cuenta? <a class="text-blue-500" @click="router.push('/')" href="/">Inicia Sesión</a></span>
                <button
                    type="submit"
                    class="w-1/2 h-14 border-2 border-gray-800 text-xl 
                tracking-wide bg-blue-500 text-white font-semibold rounded-2xl cursor-pointer
                hover:bg-blue-300 hover:scale-95 hover:text-black transition-transform duration-200"
                >Registrarse</button>
            </div>
        </form>
    </main>
</template>
