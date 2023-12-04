<template>
    <router-view />
</template>

<script setup>
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        /* text-align: center; */
        color: #2c3e50;
        overflow: hidden;
    }

    .form-control:focus{
        border-color: #6c757d;
        box-shadow: none;
    }

    .hover-pointer:hover{
        cursor: pointer;
    }
</style>