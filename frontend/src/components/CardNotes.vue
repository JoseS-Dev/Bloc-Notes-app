<script setup lang="ts">
    import { defineProps, defineEmits, ref, watch } from 'vue';
    import type { Ref } from 'vue';
    import Header from './Home/Header.vue';
    import CreateNote from './Home/CreateNote.vue';
    import TagsIcon from '../assets/icons/TagsIcon.vue';
    import WatchIcon from '../assets/icons/WatchIcon.vue';
    import FavoritesIcon from '../assets/icons/FavoritesIcon.vue';
    import TrashIcon from '../assets/icons/TrashIcon.vue';
    import type { NoteData } from '../Types/Note';
    import { deleteNote, updateNote, toggleFavorite } from '../Services/Notes';
    import Swal from 'sweetalert2';
    import { BaseNotes, favoritesNotes } from '../utils';
    
    
    const props = defineProps({
        Notes: {
            type: Array as () => NoteData[],
            required: true,
            default: () => []
        },
        title: String,
        content: String,
        token: String,
        selectedNote: Object as () => NoteData | null,
        searchTerm: {
            type: String,
            required: true
        }
    })
    const isLoading = ref<boolean>(false);
    const editableTitle = ref<HTMLElement | null>(null);
    const editableContent = ref<HTMLElement | null>(null);
    const editableTags = ref<HTMLElement | null>(null);
    const emit = defineEmits([
        'update:selectedNote',
        'search',
        'select-note'
    ])
    const SelectedTitle = ref<string>('');
    const SelectedContent = ref<string>('');
    const SelectedTags = ref<string>('');
    const SelectedDate = ref<string>('');

    // Function para actualiar el contenido de la nota seleccionada
    const updateContent = (editable: Ref<HTMLElement | null>, content: Ref<string>) => {
        if(editable.value){
           content.value = editable.value.innerHTML;
        }
    }

    // Watch para actualizar el contenido de la nota seleccionada
    watch(()=>props.selectedNote, (newNotes) => {
       if(newNotes){
           SelectedTitle.value = newNotes.title_notes;
           SelectedContent.value = newNotes.description_notes;
           SelectedTags.value = newNotes.tags_notes;
           SelectedDate.value = newNotes.date_notes.toString();
       }
       else{
            SelectedTitle.value = '';
            SelectedContent.value = '';
            SelectedTags.value = '';
            SelectedDate.value = '';
       }
    }, {deep: true});
    
    // Function para eliminar una nota
    const handleDeleteNote = async (data: NoteData) => {
        isLoading.value = true
        try{
           const WindowDeleted = await Swal.fire({
            icon: 'warning',
            title: '¿Estás seguro que quieres eliminar esta nota?',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
           })
           if(WindowDeleted.isConfirmed){
            const response = await deleteNote(data.id_notes)
            if(response.message){
                await Swal.fire({
                    icon: 'success',
                    title: 'Nota eliminada',
                    text: 'La nota ha sido eliminada exitosamente.',
                });
                if (data.id_notes === props.selectedNote?.id_notes) {
                    emit('update:selectedNote', data.id_notes);
                }
            }
           }
        }
        catch(error){
            console.error('Error deleting note:', error);
        }
        finally {
            isLoading.value = false;
        }
    }

    // Function para actualizar una nota
    const handleUpdateNote = async (data: NoteData) => {
        isLoading.value = true;
        try{
            updateContent(editableTitle, SelectedTitle);
            updateContent(editableTags, SelectedTags);
            updateContent(editableContent, SelectedContent);

            const FormData = {
                title_notes: SelectedTitle.value,
                description_notes: SelectedContent.value,
                tags_notes: SelectedTags.value,
                date_notes: new Date()
            }
            const WindowUpdate = await Swal.fire({
                icon: 'question',
                title: '¿Deseas guardar los cambios en esta nota?',
                showCancelButton: true,
                confirmButtonText: 'Guardar',
                cancelButtonText: 'Cancelar'
            })
            if(WindowUpdate.isConfirmed){
                const response = await updateNote(data.id_notes, FormData);
                if(response.data){
                    await Swal.fire({
                        icon: 'success',
                        title: 'Nota Actualizada',
                        text: 'La nota ha sido actualizada exitosamente.',
                    });
                    emit('select-note', response.data);
                    window.location.reload();
                }
            }else{
                Swal.fire({
                    icon: 'info',
                    title: 'Cancelado',
                    text: 'Los cambios no han sido guardados.',
                })
            }
        }
        catch(error){
            console.error('Error updating note:', error);
        }
        finally {
            isLoading.value = false;
        }
    }

    // Handle para cancelar los cambios
    const cancelChanges = () => {
        Swal.fire({
            icon: 'info',
            title: 'Cambios cancelados',
            text: 'Los cambios no han sido guardados.',
        });
        if(props.selectedNote){
            SelectedTitle.value = props.selectedNote.title_notes;
            SelectedContent.value = props.selectedNote.description_notes;
            SelectedTags.value = props.selectedNote.tags_notes;
            SelectedDate.value = props.selectedNote.date_notes.toString();
        }
    }

    // Handle para marcar o desmarcar una nota como favorito
    const handleToggleFavorite = async (data: NoteData) => {
        const newFavoriteStatus = data.is_favorite ? false : true;
        try{
            const response = await toggleFavorite(data.id_notes, newFavoriteStatus);
            console.log('Response from toggleFavorite:', response);
            if(response.data){
                await Swal.fire({
                    icon: 'success',
                    title: newFavoriteStatus ? 'Nota marcada como favorita' : 'Nota desmarcada de favoritas',
                    text: newFavoriteStatus ? 'La nota ha sido añadida a favoritas.' : 'La nota ha sido eliminada de favoritas.',
                });
                window.location.reload();
            }
        }
        catch(error){
            console.error('Error toggling favorite status:', error);
        }
    }

    

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
                            <h2
                            contenteditable="true" 
                            ref="editableTitle"
                            class="text-2xl text-black tracking-normal font-semibold outline-none"
                            v-html="SelectedTitle"
                            ></h2>
                            <div class="w-full flex items-center gap-6">
                                <div class="flex items-center justify-evenly gap-3">
                                    <TagsIcon/>
                                    <span class="text-lg text-gray-600">Tags</span>
                                </div>
                                <div class="w-11/12 flex items-center gap-3">
                                    <span
                                    contenteditable="true" 
                                    ref="editableTags" 
                                    class="text-lg text-gray-600 outline-none"
                                    v-html="SelectedTags"
                                    
                                    ></span>
                                </div>
                            </div>
                            <div class="w-full flex items-center gap-6">
                                <div class="flex items-center justify-evenly gap-2 w-1/5">
                                    <WatchIcon/>
                                    <span class="text-lg text-gray-600">Last Edited:</span>
                                </div>
                                <div class="w-1/2 flex items-center gap-3">
                                    <span 
                                    class="text-lg text-gray-600 font-bold"
                                    v-html="SelectedDate.split('T')[0]"
                                    ></span>
                                </div>
                            </div>
                        </div>
                        <div v-else class="w-full h-full flex justify-center items-center text-2xl text-gray-700">No hay notas seleccionadas</div>
                    </div>
                    <div class="w-full h-3/4 px-1">
                        <p
                        contenteditable="true" 
                        ref="editableContent" 
                        class="text-lg text-black font-extrabold px-2 outline-none"
                        v-html="SelectedContent"
                        ></p>
                    </div>
                    <div class="flex w-full h-1/10 border-t-2 border-gray-400 items-center gap-4 p-3">
                        <button 
                        @click="selectedNote ? handleUpdateNote(selectedNote) : null"
                        class="w-40 h-15 bg-blue-600 rounded-2xl
                        hover:bg-blue-400 hover:scale-95 outline-none cursor-pointer text-lg font-semibold
                        transition-transform duration-300">
                            {{ selectedNote ? (isLoading ? 'Guardando...' : 'Guardar') : 'Guardar' }}
                        </button>
                        <button
                        @click="cancelChanges" 
                        class="w-40 h-15 bg-gray-400 rounded-2xl text-gray-700
                        hover:bg-gray-600 hover:scale-95 hover:text-white outline-none cursor-pointer text-lg font-semibold
                        transition-transform duration-300">Cancelar</button>
                    </div>
                </div>
                <div class="w-2/6 h-full flex flex-col items-center p-5 gap-2">
                    <button
                    @click="selectedNote ? handleDeleteNote(selectedNote) : null" 
                    class="w-11/12 h-14 border-2 border-black rounded-2xl text-black text-lg
                    hover:bg-blue-600 hover:text-white hover:scale-95 transition-transform duration-200 
                    flex items-center justify-center cursor-pointer gap-3">
                        <TrashIcon />
                        {{ isLoading ? 'Eliminando...' : 'Eliminar Nota' }}
                    </button>
                    <button
                    @click="selectedNote ? handleToggleFavorite(selectedNote) : null" 
                    :class="selectedNote?.is_favorite ? favoritesNotes : BaseNotes">
                        <FavoritesIcon />
                        {{ selectedNote?.is_favorite ? 'Quitar de Favoritas' : 'Agregar a Favoritas' }}
                    </button>
                </div>
            </article>
        </section>
    </main>

</template>