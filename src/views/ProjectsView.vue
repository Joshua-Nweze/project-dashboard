<template>
    <div class="">
        <div class="row px-md-5">
            <div class="input-group mb-5">
                <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2">
                <span class="input-group-text" id="basic-addon2"><i class="bi bi-search"></i> <span class="ms-1 d-none d-md-inline">Search</span></span>
            </div>

            <div class="col-5 fw-bold">Project name</div>
            <div class="col fw-bold">Started date</div>
            <div class="col fw-bold d-none d-sm-block">Finished date</div>
            <div class="col fw-bold">details</div>
        </div>

        <div class="row align-items-center px-md-5 my-3">
            <div class="col-5">Project name</div>
            <div class="col">Started date</div>
            <div class="col d-none d-sm-block">Finished date</div>
            <div class="col"><RouterLink to="/project/id" class="btn"><i class="bi bi-eye"></i></RouterLink></div>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>