<template>
    <div class="row d-flex justify-content-center">
        <div class="col-lg-3 col-sm-6 col-md-6 mb-2">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-4 card-icon text-danger"><i class="bi bi-file-earmark"></i></div>
                        <div class="col-8 card-text text-end">
                            <span class="text-body-secondary">Files</span> 
                            <br> 
                                <span class="fs-1">
                                    {{ fileLenght }} 
                                </span>
                            </div>
                        <hr class="mt-3">
                        <span class="d-flex justify-content-center text-body-secondary updated-text"><i class="bi bi-arrow-clockwise"></i> Updated now</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-lg-3 col-sm-6 col-md-6 mb-2">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-4 card-icon text-secondary"><i class="bi bi-file-earmark"></i></div>
                        <div class="col-8 card-text text-end">
                            <span class="text-body-secondary">Categories</span> 
                            <br> 
                            <span class="fs-1">
                                {{ catArr.size }}
                            </span>
                        </div>
                        <hr class="mt-3">
                        <span class="d-flex justify-content-center text-body-secondary updated-text"><i class="bi bi-arrow-clockwise"></i> Updated now</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-lg-3 col-sm-6 col-md-6 mb-2">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-4 card-icon text-primary"><i class="bi bi-person"></i></div>
                        <div class="col-8 card-text text-end"><span class="text-body-secondary">Admins</span> <br> <span class="fs-1">0</span></div>
                        <hr class="mt-3">
                        <span class="d-flex justify-content-center text-body-secondary updated-text"><i class="bi bi-arrow-clockwise"></i> Updated now</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-lg-3 col-sm-6 col-md-6 mb-2">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-4 card-icon text-success"><i class="bi bi-pencil-square"></i></div>
                        <div class="col-8 card-text text-end"><span class="text-body-secondary">Edited</span> <br> <span class="fs-1">0</span></div>
                        <hr class="mt-3">
                        <span class="d-flex justify-content-center text-body-secondary updated-text"><i class="bi bi-arrow-clockwise"></i> Updated now</span>
                    </div>
                </div>
            </div>  
        </div>
    </div>
</template>

<script setup>
    import { useFiles } from "@/store/useFiles"
    import { reactive, ref } from "@vue/reactivity";
    import { storeToRefs } from "pinia";

    let files = useFiles()
    let {file, catArr} = storeToRefs(files)
    let fileDetails = file.value.files

    let fileLenght = fileDetails.length
        
</script>

<style scoped>
    .card-icon{
        font-size: 40px;
    }

    .card-text{
        line-height: 25px;
    }

    .updated-text{
        font-size: 13px;
        font-weight: 500;
    }
</style>