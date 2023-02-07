<template>
    <div class="row align-items-center">
        <div class="col-3 fs-2">Files</div>

        <div class="col-6">
            <div class="row">
                <div class="col-9">
                    <input type="email" class="form-control" id="searchInput" placeholder="Search files">
                </div>
                <div class="col-3">
                    <button type="button" class="btn btn-outline-secondary">Search</button>
                </div>
            </div>
        </div>

        <div class="col-3 d-flex justify-content-end dropdown">
            <div class="dropdown-toggle hover-pointer" data-bs-toggle="dropdown" aria-expanded="false"><i class="bi bi-filter"></i> Sort</div>

            <ul class="dropdown-menu justify-content-end">
                <li><a class="dropdown-item" href="#">Recently added</a></li>
                <li><a class="dropdown-item" href="#">A - Z</a></li>
                <li><a class="dropdown-item" href="#">Z - A</a></li>
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

    .form-control:focus{
        border-color: #6c757d;
        box-shadow: none;
    }

    .hover-pointer:hover{
        cursor: pointer;
    }
</style>