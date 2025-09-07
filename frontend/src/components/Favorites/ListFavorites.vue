<script setup lang="ts">
    import { defineProps } from 'vue';
    import type { NoteData } from '../../Types/Note';
    import { SeparateTags } from '../../utils';
    import LogoutIcon from '../../assets/icons/LogoutIcon.vue';

    const props = defineProps({
        favoritesNotes: {
            type: Array as () => NoteData[],
            required: true,
            default: () => []
        }
    })
</script>

<template>
    <section class="w-3/10 border-r-2 border-blue-500 h-full flex flex-col items-center p-4 gap-1">
        <div class="w-full h-8 flex items-center justify-between border-b-2 border-blue-700">
            <h2 class="w-full text-2xl font-bold text-black tracking-normal">Lista de Notas Favoritas</h2>
            <LogoutIcon/>
        </div>
        <div class="w-full h-full flex flex-col overflow-auto justify-evenly pt-1.5 gap-2 text-black">
            <div v-if="props.favoritesNotes.length === 0" class="w-full h-full flex justify-center items-center text-2xl text-gray-700">No hay notas Favoritas</div>
            <div v-for="note in props.favoritesNotes" @click="$emit('selected-favorite-note', note)" :key="note.id_notes" class="border-2 border-blue-400 bg-gray-100 w-full text-black min-h-auto p-2 gap-1.5 flex flex-col justify-around rounded-xl 
            hover:bg-blue-400 hover:text-white hover:border-black hover:scale-95 cursor-pointer transition-transform duration-200">
                <h4 class="text-xl tracking-normal font-semibold">{{ note.title_notes }}</h4>
                <div class="w-full flex gap-2">
                    <span v-for="(tag, index) in SeparateTags(note.tags_notes)" :key="index" class="border-2 border-gray-600 text-center bg-gray-200 text-md p-1 w-auto">
                        {{ tag }}
                    </span>
                </div>
                <span class="text-lg">{{ note.date_notes.toString().split('T')[0] }}</span>
            </div>
        </div>
    </section>
</template>