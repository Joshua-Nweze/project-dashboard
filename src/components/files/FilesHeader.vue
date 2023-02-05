<template>
    <div class="row align-items-center">
        <div class="col-3 fs-2">Files</div>

        <div class="col-6">Search bar goes here</div>

        <div class="col-3 d-flex justify-content-end dropdown">
            <div class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i class="bi bi-filter"></i> Sort</div>

            <ul class="dropdown-menu justify-content-end">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
    .dropdown-toggle::after{
        display: none;
    }
</style>