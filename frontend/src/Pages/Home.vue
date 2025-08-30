<script setup lang='ts'>
    import SideNotes from '../components/SideNotes.vue';
    import CardNotes from '../components/CardNotes.vue';
</script>

<template>
    <main class="w-full h-screen flex">
        <SideNotes title="Notas" content="Contenido de las notas" />
        <CardNotes title="Vista Previa" content="Contenido de la vista previa"/>
    </main>
</template>