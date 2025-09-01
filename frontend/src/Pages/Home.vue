<script setup lang='ts'>
    import SideNotes from '../components/SideNotes.vue';
    import CardNotes from '../components/CardNotes.vue';
    import type { NoteData } from '../Types/Note';
    import { ref } from 'vue';

    const token = localStorage.getItem('token') || '';
    const selectedNote = ref<NoteData | null>(null);
    const searchTerm = ref('');

    function onSelectNote(note: NoteData) {
        selectedNote.value = note;
    }
    // Function para la busqueda de notas
    function onSearch(query: string) {
        searchTerm.value = query;
    }

</script>

<template>
    <main class="w-full h-screen flex">
        <SideNotes 
            title="Notas" 
            content="Contenido de las notas" 
            :token="token"
            @select-note="onSelectNote" 
        />
        <CardNotes 
            title="Vista Previa" 
            content="Contenido de la vista previa" 
            :token="token"
            :selected-note="selectedNote"
            :search-term="searchTerm"
            @select-note="onSelectNote"
            @search="onSearch"
        />
    </main>
</template>