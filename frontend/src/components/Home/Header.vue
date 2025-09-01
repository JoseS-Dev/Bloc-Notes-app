<script setup lang="ts">
    import { defineProps, watch } from 'vue';
    import { useRouter } from 'vue-router';
    import SettingsIcon from '../../assets/icons/SettingsIcon.vue';
    import {ref} from 'vue';
    import { defineEmits } from 'vue';
    const router = useRouter();
    const props = defineProps({
        title: String
    })
    const searchQuery = ref('');
    const emit = defineEmits(['search']);

    // Watcher para emitir el query de busqueda
    watch(searchQuery, (newQuery) => {
        emit('search', newQuery.trim());
    });
</script>

<template>
    <header class="w-full h-17 border-b-2 border-blue-400 flex items-center justify-between px-5">
        <h2 class="text-2xl tracking-normal font-semibold text-black">{{ props.title }}</h2>
        <article class="flex items-center justify-around w-2/5 h-full">
            <input
                class="w-4/5 border-2 border-blue-600 h-4/5 px-3 rounded-xl text-black
                hover:border-blue-400 focus:border-blue-400 outline-none bg-gray-100
                transition-colors duration-200 placeholder:text-gray-700 text-lg"
                placeholder="Buscar Notas..."
                v-model="searchQuery"
            />
            <button @click="router.push('/settings')"><SettingsIcon/></button>
        </article>
    </header>
</template>