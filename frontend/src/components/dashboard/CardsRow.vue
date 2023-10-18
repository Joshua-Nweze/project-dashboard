<template>
    <div class="row d-flex justify-content-center">

        <div class="col-12 col-md-8">
            <div class="row">
                <div class="col-12">
                    <div class="card bg-primary my-2 ">
                        <div class="card-body p-0">
                            <div class="row align-items-center">
                                <div class="col">
                                    <img src="../../assets/imgs/engineer.png" alt="" class="img-fluid">
                                </div>
                                <div class="col text-white p-3">
                                    <div class="fs-3 fw-bold">John Doe!</div>
                                    <div style="font-size: 14px;">You have 3 ongoing projects. <br> Keep it going.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-6 col-sm-6 col-md-6 mb-2">
                    <div class="card bg-primary-subtle">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-4 card-icon text-primary"><i class="bi bi-cone"></i></div>
                                <div class="col-8 card-text text-end">
                                    <span class="text-body-secondary">Total projects</span> 
                                    <br> 
                                        <span class="fs-1">
                                            {{ fileLenght }} 
                                        </span>
                                    </div>
                                <!-- <hr class="mt-3">
                                <span class="d-flex justify-content-center text-body-secondary updated-text"><i class="bi bi-arrow-clockwise"></i> Updated now</span> -->
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-6 col-sm-6 col-md-6 mb-2">
                    <div class="card bg-warning-subtle">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-4 card-icon text-warning"><i class="bi bi-cone"></i></div>
                                <div class="col-8 card-text text-end">
                                    <span class="text-body-secondary">Ongoing projects</span> 
                                    <br> 
                                    <span class="fs-1">
                                        {{ catArr.size }} 0
                                    </span>
                                </div>
                                <!-- <hr class="mt-3">
                                <span class="d-flex justify-content-center text-body-secondary updated-text"><i class="bi bi-arrow-clockwise"></i> Updated now</span> -->
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-6 col-sm-6 col-md-6 mb-2">
                    <div class="card bg-success-subtle">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-4 card-icon text-success"><i class="bi bi-cone"></i></div>
                                <div class="col-8 card-text text-end"><span class="text-body-secondary">Finished projects</span> <br> <span class="fs-1">0</span></div>
                                <!-- <hr class="mt-3">
                                <span class="d-flex justify-content-center text-body-secondary updated-text"><i class="bi bi-arrow-clockwise"></i> Updated now</span> -->
                            </div>
                        </div>
                    </div>  
                </div>

                <div class="col-lg-6 col-sm-6 col-md-6 mb-2">
                    <div class="card bg-dark-subtle">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-4 card-icon text-dark"><i class="bi bi-person"></i></div>
                                <div class="col-8 card-text text-end"><span class="text-body-secondary">Staff   </span> <br> <span class="fs-1">0</span></div>
                                <!-- <hr class="mt-3">
                                <span class="d-flex justify-content-center text-body-secondary updated-text"><i class="bi bi-arrow-clockwise"></i> Updated now</span> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12 col-md-4">
            <div class="card">
                <div class="card-body">
                    <div class="fs-3 text-secondary">Recent projects</div>
                    <div class="list-group p-1 px-2 my-2 recent-project">
                        <div class="fs-5">Okay</div>
                        <div class="text-muted" style="font-size: 13px;">Ekene okoi</div>
                    </div>
                    <div class="list-group p-1 px-2 my-2 recent-project">
                        <div class="fs-5">Okay</div>
                        <div class="text-muted" style="font-size: 13px;">Ekene okoi</div>
                    </div>
                    <div class="list-group p-1 px-2 my-2 recent-project">
                        <div class="fs-5">Okay</div>
                        <div class="text-muted" style="font-size: 13px;">Ekene okoi</div>
                    </div>
                    <div class="list-group p-1 px-2 my-2 recent-project">
                        <div class="fs-5">Okay</div>
                        <div class="text-muted" style="font-size: 13px;">Ekene okoi</div>
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

    .recent-project{
        background-color: rgb(215, 215, 215);
    }
</style>