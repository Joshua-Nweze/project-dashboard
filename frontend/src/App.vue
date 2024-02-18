<template>
    <div>
        <div>
            <router-view />
        </div>
    </div>
</template>

<script setup>
import { provide } from 'vue';

// when changing the api host, change also in router/index.js
// and in store/*
provide('apihost', process.env.VUE_APP_API_HOST)
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