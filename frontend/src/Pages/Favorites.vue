<script setup lang="ts">
    import ListFavorites from '../components/Favorites/ListFavorites.vue';
    import CardFavorites from '../components/CardFavorites.vue';
    import {ref, watch, onMounted} from 'vue';
    import type { NoteData } from '../Types/Note';
    import { getFavoritesNotes } from '../Services/Notes';

    const Favorites = ref<NoteData[]>([]);
    const token = localStorage.getItem('token') || '';
    const selectedNote = ref<NoteData | null>(null);

    // Function para seleccionar una nota
    function onSelectNote(note: NoteData) {
        selectedNote.value = note;
    }
    // Function para colocar el selectedNote
    function onUpdateSelectedNote(deleteNoteId: number) {
        Favorites.value = Favorites.value.filter(note => note.id_notes !== deleteNoteId);
        if(selectedNote.value?.id_notes === deleteNoteId) {
            selectedNote.value = null;
        }
    }
    // Function para obtener las notas favoritas
    async function fetchFavorites(){
        try{
            if(token){
                const response = await getFavoritesNotes(token);
                if(response.data){
                    Favorites.value = response.data;
                }
            }
        }catch(error){
            console.error("Error fetching favorite notes:", error);
        }
    }
    
    onMounted(() => {
        fetchFavorites();
    });

    watch(() => token, () => {
        fetchFavorites();
    });

</script>

<template>
    <main class="w-full h-screen flex">
        <ListFavorites 
            :favorites-notes="Favorites"
            @selected-favorite-note="onSelectNote"
        />
        <CardFavorites 
            :selected-note-favorite="selectedNote"
            @selected-favorite-note="onSelectNote"
            @update:selectedNoteFavorite="onUpdateSelectedNote"   
        />
    </main>
</template>
