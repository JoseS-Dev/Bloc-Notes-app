<script setup lang="ts">
    import AddIcon from '../../assets/icons/AddIcon.vue';
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
            <div class="w-full min-h-1/6 border-2 border-blue-400 bg-gray-100 text-black p-2 flex flex-col justify-around gap-1 rounded-xl 
            hover:bg-blue-400 hover:text-white hover:border-black hover:scale-95 cursor-pointer transition-transform duration-200">
                <h4 class="text-xl tracking-normal font-semibold">Nueva Nota</h4>
                <div class="w-full flex">
                    <span class="border-2 border-gray-600 text-center bg-gray-200 text-md  w-12">Dev</span>
                </div>
                <span class="text-lg px-1">29 mar, 2025</span>
            </div>
            
        </div>
    </article>
</template>