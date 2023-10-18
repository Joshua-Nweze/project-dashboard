<template>
    <div class="input-group mb-5">
        <input type="text" class="form-control" :placeholder="placeholder" aria-label="Recipient's username" aria-describedby="basic-addon2">
        <span class="input-group-text" id="basic-addon2"><i class="bi bi-search"></i> <span class="ms-1 d-none d-md-inline">Search</span></span>
    </div>
</template>

<script setup>
defineProps(['placeholder'])
</script>