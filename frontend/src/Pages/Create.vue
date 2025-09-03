<script setup lang="ts">
    import type { Ref } from 'vue';
    import TagsIcon from '../assets/icons/TagsIcon.vue';
    import {ref, watch} from 'vue';
    import swal from 'sweetalert2';
    import { createNewNote } from '../Services/Notes';
    import { useRouter } from 'vue-router';

    const router = useRouter();

    const editableTitle = ref<HTMLElement | null>(null);
    const editableTags = ref<HTMLElement | null>(null);
    const editableContent = ref<HTMLElement | null>(null);
    const contenidoTitle = ref<string>('Titulo de la Nota');
    const contenidoTags = ref<string>('Agregar Tags');
    const contenidoContent = ref<string>('Agregar contenido de la nota aqui');
    const token = localStorage.getItem('token') || '';
    const isLoading = ref<boolean>(false);

    // Function para actulizar el contenido de los refs
    const updateContent = (editable: Ref<HTMLElement | null>, content: Ref<string>) => {
        if(editable.value){
           content.value = editable.value.innerHTML;
        }
    }

    // Watch para actualización del contenido
    watch([editableTitle, editableTags, editableContent], () => {
        updateContent(editableTitle, contenidoTitle);
        updateContent(editableTags, contenidoTags);
        updateContent(editableContent, contenidoContent);
        
    }, {deep: true});

    // Function para crear la nota
    const createNote = async (e: Event) => {
        e.preventDefault();
        if(!contenidoTitle.value || !contenidoContent.value || !contenidoTags.value){
            swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor completa todos los campos',
            });
            return;
        }
        isLoading.value = true;
        try{
            updateContent(editableTitle, contenidoTitle);
            updateContent(editableTags, contenidoTags);
            updateContent(editableContent, contenidoContent);

            const FormData = {
                title_notes: contenidoTitle.value,
                description_notes: contenidoContent.value,
                tags_notes: contenidoTags.value,
                date_notes: new Date()
            }
            const result = await createNewNote(token, FormData);
            if(result.data){
                const Confirmed = await swal.fire({
                    icon: 'success',
                    title: 'Nota Creada, ¿Deseas crear otra?',
                    text: 'La nota ha sido creada exitosamente.',
                    showCancelButton: true,
                    confirmButtonText: 'Sí',
                    cancelButtonText: 'No'
                })
                if(Confirmed.isConfirmed){
                    contenidoTitle.value = '',
                    contenidoTags.value = '',
                    contenidoContent.value = '';
                    
                }
                await swal.fire({
                    icon: 'success',
                    title: 'Nota Creada',
                    text: 'La nota ha sido creada exitosamente.',
                });
                router.push('/home');
            }
        }
        catch(error){
            swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al crear la nota, intenta nuevamente',
            });
        }
        finally {
            isLoading.value = false;
        }
    }

    // Function para cancelar la creación de la nota y volver a la home
    const cancelNote = async () =>{
        const cancelWindow = await swal.fire({
            title: '¿Estás seguro?',
            text: "Los cambios no guardados se perderán.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, cancelar',
            cancelButtonText: 'No, volver'
        })
        if(cancelWindow.isConfirmed){
            router.push('/home');
        }
    }


</script>

<template>
    <main class="w-full h-screen flex flex-col">
        <header class="w-full border-b-2 border-black h-16 flex items-center px-5 bg-blue-500 justify-between">
            <h2 class="text-2xl tracking-normal font-semibold">Crear una nueva Nota</h2>
            <div class="w-1/4 h-full flex justify-evenly items-center">
                <button @click="createNote" class="w-2/5 h-4/5 bg-blue-800 text-xl tracking-tighter rounded-2xl
                hover:bg-gray-300 hover:text-black hover:scale-95 hover:border-black transition-transform 
                duration-200 cursor-pointer outline-none">
                    {{ isLoading ? 'Creando...' : 'Guardar Nota' }}
                </button>
                <button @click="cancelNote" class="w-2/5 h-4/5 bg-blue-800 text-xl tracking-tighter rounded-2xl
                hover:bg-gray-300 hover:text-black hover:scale-95 hover:border-black transition-transform 
                duration-200 cursor-pointer outline-none">
                    Cancelar
                </button>
            </div>
        </header>
        <section class="w-full h-full flex flex-col">
            <article class="w-full h-25 justify-center border-b-2 border-gray-600 flex flex-col p-3">
                <h3 ref="editableTitle" 
                contenteditable="true" 
                autofocus="true" 
                class="text-2xl font-semibold tracking-tighter text-black outline-none" 
                v-html="contenidoTitle"
                >
                </h3>
                <div class="w-full h-21 items-center">
                    <div class="flex items-center gap-4 w-full h-full">
                        <TagsIcon/>
                        <span class="text-lg  tracking-normal text-gray-600">Tags:</span>
                        <span ref="editableTags" contenteditable="true" class="text-lg text-gray-600 tracking-normal outline-none" v-html="contenidoTags"></span>
                    </div>
                </div>
            </article>
            <article class="w-full h-4/5 p-3 flex flex-col">
                <h3 class="text-2xl font-semibold tracking-tighter w-full border-b-2 border-gray-600 text-black">Contenido de la nota</h3>
                <div class="w-full h-full border-2">
                    <p ref="editableContent" class="w-full h-full outline-none text-black p-3" contenteditable="true" v-html="contenidoContent"></p>
                </div>
            </article>
        </section>
    </main>
</template>