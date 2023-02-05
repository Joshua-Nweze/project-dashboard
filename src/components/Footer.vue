<template>
    <footer class="footer">
        <div class="row">
            <div class="col-6">&copy; {{ new Date().getFullYear() }} ESHDC Data Dashboard </div>
            <div class="col-6 text-end">Designed and created by Joshua Nweze</div>
        </div>
    </footer>
</template>

<script setup>

</script>

<style scoped>
    .footer{
        background-color: var(--bs-gray-200);
        padding: 20px 5px;
    }
</style>