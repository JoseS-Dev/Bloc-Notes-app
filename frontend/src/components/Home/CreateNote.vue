<script setup lang="ts">
    import AddIcon from '../../assets/icons/AddIcon.vue';
    import { defineProps } from 'vue';
    import type { NoteData } from '../../Types/Note';
    import { SeparateTags } from '../../utils';
    import { defineEmits } from 'vue';
    import { computed } from 'vue';

    const props = defineProps({
        AllNotes: {
            type: Array as () => NoteData[],
            default: () => []
        },
        selectedNote: Object as () => NoteData | null,
        searchTerm: {
            type: String,
            required: true
        } 
    })
    const emit = defineEmits(['select-note']);
    // Function to emit the selected note
    function selectNote(note: NoteData) {
        emit('select-note', note);
    }
    
    // Computed para filtrar notas
    const filteredNotes = computed(() => {
        if(!props.searchTerm){
            return props.AllNotes;
        }
        return props.AllNotes?.filter(note =>
            note.title_notes.toLowerCase().includes(props.searchTerm.toLowerCase()) ||
            note.tags_notes.toLowerCase().includes(props.searchTerm.toLowerCase())
        )
    })

</script>

<template>
    <article class="w-1/4 h-full border-r-2 border-blue-500 flex flex-col items-center py-2 px-1 gap-2">
        <button 
        class="h-12 w-11/12 bg-blue-600 text-white rounded-xl text-xl 
        tracking-normal font-semibold flex items-center justify-center gap-3  hover:bg-blue-200 hover:text-black
        hover:scale-95 transition-transform duration-300 cursor-pointer">
            <AddIcon/>
            Crear Nota
        </button>
        <div class="w-full h-full border-t-2 overflow-auto border-blue-600 flex flex-col items-center py-2 px-2 gap-2">
            <div  v-if="filteredNotes?.length > 0" class="w-full h-full flex flex-col items-center gap-2 overflow-auto">
                <div @click="selectNote(note)" v-for="note in filteredNotes" :key="note.id_notes" class="border-2 border-blue-400 bg-gray-100 w-full text-black min-h-1/10 p-2 gap-1.5 flex flex-col justify-around rounded-xl 
                hover:bg-blue-400 hover:text-white hover:border-black hover:scale-95 cursor-pointer transition-transform duration-200">
                    <h4 class="text-xl tracking-normal font-semibold">{{ note.title_notes }}</h4>
                    <div class="w-full flex gap-2">
                        <span v-for="(tag, index) in SeparateTags(note.tags_notes)" :key="index" class="border-2 border-gray-600 text-center bg-gray-200 text-md p-1 w-auto">
                            {{ tag }}
                        </span>
                    </div>
                    <span class="text-lg">{{ note.date_notes.split('T')[0] }}</span>
                </div>
            </div>
            <div v-else class="w-full h-full flex justify-center items-center text-2xl text-gray-700">No hay notas registradas</div>
        </div>
    </article>
</template>