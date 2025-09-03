<script setup lang="ts">
    import AllIcon from '../assets/icons/AllIcon.vue';
    import FavoritesIcon from '../assets/icons/FavoritesIcon.vue';
    import LogoutIcon from '../assets/icons/LogoutIcon.vue';
    import type { NoteData } from '../Types/Note';
    import { defineProps } from 'vue';
    import { SeparateTags } from '../utils';
    const props = defineProps({
        title: String,
        content: String,
        token: String,
        Notes: {
            type: Array as () => NoteData[],
            required: true,
            default: () => []
        }
    })

</script>

<template>
    <nav :title="props.title" class="border-r-2 border-blue-300 w-1/4 h-full flex flex-col p-2 gap-1.5">
        <article class="w-full border-b-2 border-blue-700 h-14 text-black flex items-center justify-between px-2.5">
            <h1 class="text-3xl font-bold">Notes</h1>
            <LogoutIcon/>
        </article>
        <article class='w-full h-1/5 flex flex-col items-center border-b-2 border-blue-600 p-1 justify-evenly'>
            <button 
            class="flex items-center gap-4 px-3 w-11/12  bg-blue-600 
            h-13 text-xl font-semibold tracking-wider hover:bg-blue-200 hover:text-black hover:scale-95 rounded-2xl
            transition-transform duration-300 cursor-pointer"
            >
                <AllIcon/>
                All Notes
            </button>
            <button 
            class="flex items-center gap-2 px-2 w-11/12  h-13 bg-blue-600 text-xl
            font-semibold tracking-wider hover:bg-blue-200 hover:text-black hover:scale-95 rounded-2xl
            transition-transform duration-300 cursor-pointer"
            >
                <FavoritesIcon/>
                Notas Favoritas
            </button>
        </article>
        <article class="w-full h-4/5 p-2 flex flex-col items-center gap-1.5">
            <div class="w-full h-11 border-b-2 border-gray-500 px-2 flex flex-col justify-center">
                <h3 class="text-xl tracking-wider text-black font-semibold">Notas Recientes</h3>
            </div>
            <div class="w-full h-11/12 flex flex-col items-center gap-2 overflow-auto p-1">
                <div v-if="Notes.length === 0" class="flex justify-center items-center text-2xl text-gray-700">No hay notas Recientes</div>
                <div @click="$emit('select-note', note)" v-for="note in Notes" :key="note.id_notes" class="border-2 border-blue-400 bg-gray-100 w-full text-black min-h-1/4 p-2 flex flex-col justify-around rounded-xl 
                hover:bg-blue-400 hover:text-white hover:border-black hover:scale-95 cursor-pointer transition-transform duration-200">
                    <h4 class="text-xl tracking-normal font-semibold">{{ note.title_notes }}</h4>
                    <div class="w-full flex">
                        <span v-for="(tag, index) in SeparateTags(note.tags_notes)" :key="index" class="border-2 border-gray-600 text-center bg-gray-200 text-md p-1 w-auto">
                            {{ tag }}
                        </span>
                    </div>
                    <span class="text-lg">{{ note.date_notes.toString().split('T')[0] }}</span>
                </div>
            </div>

        </article>
    </nav>
</template>