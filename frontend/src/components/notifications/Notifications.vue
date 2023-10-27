<template>
    <div class="row">
        <div class="col-12">
            <div class="row mt-5 justify-content-center">
                <div class="col-12 col-md-9">
                    <div class="card">
                        <div class="card-body">
                            <span class="fs-3"><i class="bi bi-bell"></i> Notifications</span> <br>
                            <hr>
                            <div>
                                <div class="col-12 d-flex justify-content-center fs-4 text-body-secondary">No notification to show</div>

                                <div class="row align-items-center div-list">
                                    <div class="col-10">notification</div>

                                    <div class="col-2 d-flex justify-content-end">

                                        <span class="p-2 rounded bg-primary-subtle mx-1 hover-pointer" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Mark as read">
                                            <i class="bi bi-check-all text-primary"></i>
                                        </span>
                                        <span class="p-2 rounded bg-danger-subtle mx-1 hover-pointer" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Delete">
                                            <i class="bi bi-trash text-danger"></i>
                                        </span>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
  .div-list{
        padding: 10px 0;
        border-bottom: 1px solid #c8c9ca;
    }
</style>