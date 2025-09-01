<script setup lang="ts">
    import { defineProps } from 'vue';
    import Header from './Home/Header.vue';
    import CreateNote from './Home/CreateNote.vue';
    import TagsIcon from '../assets/icons/TagsIcon.vue';
    import WatchIcon from '../assets/icons/WatchIcon.vue';
    import FavoritesIcon from '../assets/icons/FavoritesIcon.vue';
    import TrashIcon from '../assets/icons/TrashIcon.vue';
    import type { NoteData } from '../Types/Note';
    import {ref, onMounted} from 'vue';
    import { getAllNotes } from '../Services/Notes';
    
    const props = defineProps({
        title: String,
        content: String,
        token: String,
        selectedNote: Object as () => NoteData | null,
        searchTerm: {
            type: String,
            required: true
        }
    })

    const Notes = ref<NoteData[]>([]);
    

    // Function para obtener todas las notas
    async function fetchAllNotes() {
        try {
            if(props.token){
                const response = await getAllNotes(props.token);
                console.log(response.data)
                if(response.data){
                    Notes.value = response.data;
                }
            }
            else{
                console.log("401 el token no se encontro")
            }
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    }

    onMounted(() => {
        fetchAllNotes();
    });

</script>

<template>
    <main class="h-full w-3/4 border-l-2 border-blue-400 flex flex-col">
        <Header title="All Notes" @search="$emit('search', $event)" />
        <section class="w-full min-h-11/12 flex">
            <CreateNote 
            :-all-notes="Notes"
            @select-note="$emit('select-note', $event)"
            :search-term="searchTerm"
            />
            <article class="w-3/4 h-full flex">
                <div class="w-4/6 h-full flex flex-col p-2 border-r-2 border-blue-400 items-center gap-1.5">
                    <div class="w-full h-auto border-b-2 border-gray-400 flex flex-col justify-center p-3 gap-3">
                        <div v-if="selectedNote">
                            <h2 class="text-2xl text-black tracking-normal font-semibold">{{ selectedNote?.title_notes }}</h2>
                            <div class="w-full flex items-center gap-6">
                                <div class="flex items-center justify-evenly gap-3">
                                    <TagsIcon/>
                                    <span class="text-lg text-gray-600">Tags</span>
                                </div>
                                <div class="w-11/12 flex items-center gap-3">
                                    <span class="text-lg text-gray-600">{{ selectedNote?.tags_notes }}</span>
                                </div>
                            </div>
                            <div class="w-full flex items-center gap-6">
                                <div class="flex items-center justify-evenly gap-2 w-1/5">
                                    <WatchIcon/>
                                    <span class="text-lg text-gray-600">Last Edited:</span>
                                </div>
                                <div class="w-1/2 flex items-center gap-3">
                                    <span class="text-lg text-gray-600 font-bold">{{ selectedNote?.date_notes.split('T')[0] }}</span>
                                </div>
                            </div>
                        </div>
                        <div v-else class="w-full h-full flex justify-center items-center text-2xl text-gray-700">No hay notas seleccionadas</div>
                    </div>
                    <div class="w-full h-3/4"></div>
                    <div class="flex w-full h-1/10 border-t-2 border-gray-400 items-center gap-4 p-3">
                        <button 
                        class="w-40 h-15 bg-blue-600 rounded-2xl
                        hover:bg-blue-400 hover:scale-95 outline-none cursor-pointer text-lg font-semibold
                        transition-transform duration-300">
                            Guardar Nota
                        </button>
                        <button class="w-40 h-15 bg-gray-400 rounded-2xl text-gray-700
                        hover:bg-gray-600 hover:scale-95 hover:text-white outline-none cursor-pointer text-lg font-semibold
                        transition-transform duration-300">Cancelar</button>
                    </div>
                </div>
                <div class="w-2/6 h-full flex flex-col items-center p-5 gap-2">
                    <button class="w-11/12 h-14 border-2 border-black rounded-2xl text-black text-lg
                    hover:bg-blue-600 hover:text-white hover:scale-95 transition-transform duration-200 
                    flex items-center justify-center cursor-pointer gap-3">
                        <TrashIcon />
                        Eliminar Nota
                    </button>
                    <button class="w-11/12 h-14 border-2 border-black rounded-2xl text-black text-lg
                    hover:bg-blue-600 hover:text-white hover:scale-95 transition-transform duration-200
                    flex items-center justify-center cursor-pointer gap-3">
                        <FavoritesIcon />
                        Favoritos
                    </button>
                </div>
            </article>
        </section>
    </main>

</template>