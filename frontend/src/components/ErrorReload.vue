<template>
    <div class="text-center overflow-hidden">
        <div>
            Something went wrong, try reloading page
        </div>
        <div class="mt-3">
            <button class="btn btn-outline-secondary" @click="reload">Reload page</button>
        </div>
    </div>
</template>

<script setup>
function reload() {
    window.location.href = window.location.href 
}
</script>


<style scoped>

</style>