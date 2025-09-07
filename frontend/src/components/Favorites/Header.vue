<script setup lang="ts">
    import { defineProps } from 'vue';
    const props = defineProps({
        title: String,
    })
</script>

<template>
    <header class="w-full border-2 border-black h-13 flex items-center px-5 justify-between bg-blue-500">
        <h3 class="text-2xl tracking-normal font-semibold">{{ props.title }}</h3>
        <article class="w-1/4 h-full flex items-center justify-evenly gap-4">
            <a href="/home"
            class="w-1/2 h-4/5 flex items-center justify-center
            bg-blue-700 text-xl tracking-normal font-semibold hover:bg-blue-50 hover:text-black 
            hover:scale-95 hover:border-2 rounded-2xl transition-transform duration-300 cursor-pointer
            outline-none"
            >
                Home
            </a>
            <a href="/create"
            class="w-1/2 h-4/5 flex items-center justify-center
            bg-blue-700 text-xl tracking-normal font-semibold hover:bg-blue-50 hover:text-black 
            hover:scale-95 hover:border-2 rounded-2xl transition-transform duration-300 cursor-pointer
            outline-none"
            >
                Crear nota
            </a>
        </article>
    </header>
</template>