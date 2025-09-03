<script setup lang='ts'>
    import SideNotes from '../components/SideNotes.vue';
    import CardNotes from '../components/CardNotes.vue';
    import type { NoteData } from '../Types/Note';
    import { ref, onMounted, watch } from 'vue';
    import { getAllNotes } from '../Services/Notes';

    const token = localStorage.getItem('token') || '';
    const selectedNote = ref<NoteData | null>(null);
    const searchTerm = ref('');
    const Notes = ref<NoteData[]>([]);

    function onSelectNote(note: NoteData) {
        selectedNote.value = note;
    }
    // Function para la busqueda de notas
    function onSearch(query: string) {
        searchTerm.value = query;
    }

    // Function para colocar el selectedNote
    function onUpdateSelectedNote(deleteNoteId: number) {
        Notes.value = Notes.value.filter(note => note.id_notes !== deleteNoteId);
        if(selectedNote.value?.id_notes === deleteNoteId) {
            selectedNote.value = null;
        }
    }
    async function fetchAllNotes() {
        try {
            if(token){
                const response = await getAllNotes(token);
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

    watch(() => token, () => {
        fetchAllNotes();
    });

</script>

<template>
    <main class="w-full h-screen flex">
        <SideNotes 
            title="Notas" 
            content="Contenido de las notas" 
            :token="token"
            :-notes="Notes"
            @select-note="onSelectNote" 
        />
        <CardNotes
            :-notes="Notes" 
            title="Vista Previa" 
            content="Contenido de la vista previa" 
            :token="token"
            :selected-note="selectedNote"
            :search-term="searchTerm"
            @select-note="onSelectNote"
            @search="onSearch"
            @update:selectedNote="onUpdateSelectedNote"
        />
    </main>
</template>