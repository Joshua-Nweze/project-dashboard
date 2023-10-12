<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <div class="row">
                    <div class="col-8 fs-3">WHAT IF PROJECT NAME IS LONG</div>
                    <div class="col-4 fs-3 d-flex justify-content-end"><button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Update</button></div>
                </div>
                <div class="stepper d-flex flex-column mt-4 ml-2">

                    <div class="d-flex mb-1 mt-3">
                        <div class="d-flex flex-column pr-4 align-items-center">
                            <div class="rounded-circle py-2 px-2 bg-primary text-white mb-1"></div>
                            <div class="line h-100"></div>
                        </div>
                        <div class="ms-3">
                            <div class="text-dark timeline-header">Create your application respository</div>
                            <span class="text-muted date">Date</span>
                            <p class="lead text-muted timeline-about">Choose your website name & create repository</p>

                            <Lightgallery
                                :settings="{ speed: 500, plugins: plugins }"
                                :onInit="onInit"
                                :onBeforeSlide="onBeforeSlide"
                                class="row"
                            >
                                <a href="https://image.freepik.com/free-photo/stylish-young-woman-with-bags-taking-selfie_23-2147962203.jpg" class="col-lg-3 col-md-4 col-6 col-sm my-1" data-fancybox-group="light"> 
                                    <img class="img-fluid" src="https://image.freepik.com/free-photo/stylish-young-woman-with-bags-taking-selfie_23-2147962203.jpg" alt="">
                                </a>
                                <a href="https://image.freepik.com/free-photo/pretty-girl-near-car_1157-16962.jpg" class="col-lg-3 col-md-4 col-6 col-sm my-1" data-fancybox-group="light"> 
                                    <img class="img-fluid" src="https://image.freepik.com/free-photo/pretty-girl-near-car_1157-16962.jpg" alt="">
                                </a>
                            </Lightgallery>
                        </div>
                    </div>

                    <div class="d-flex mb-1 mt-3">
                        <div class="d-flex flex-column pr-4 align-items-center">
                            <div class="rounded-circle py-2 px-2 bg-primary text-white mb-1"></div>
                            <div class="line h-100"></div>
                        </div>
                        <div class="ms-3">
                            <div class="text-dark timeline-header">Clone application respository</div>
                            <span class="text-muted date">Date</span>
                            <p class="lead text-muted pb-3 timeline-about">Go to your dashboard and clone Git respository from the url in the dashboard of your application</p>
                        </div>
                    </div>

                    <div class="d-flex mb-1  mt-3">
                        <div class="d-flex flex-column pr-4 align-items-center">
                            <div class="rounded-circle py-2 px-2 bg-primary text-white mb-1"></div>
                            <div class="line h-100"></div>
                        </div>
                        <div class="ms-3">
                            <div class="text-dark timeline-header">Make changes and push!</div>
                            <span class="text-muted date">Date</span>
                            <p class="lead text-muted pb-3 timeline-about">Now make changes to your application source code, test it then commit &amp; push</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Project update</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body">

                <label class="" for="milestone">Milestone</label>
                <input type="text" class="form-control" id="milestone">

                <label class="mt-4" for="description">Milestone description</label>
                <textarea type="text" class="form-control" id="description"></textarea>

                <div class="mt-4">Attach document ( image(s) )</div>
                <div class="attach-doc-div text-center " ref="dragArea" @dragover="dragOver" @dragleave="dragLeave" @drop="dragDrop">
                    <div ref="fileFeedback"></div>
                    <span><i class="bi bi-upload fs-1 text-secondary"></i> <br> Drag and drop here</span> <br>
                    <span>or</span> <br>
                    <div>
                        Select file <br>

                        <div class="d-flex justify-content-center mt-3">
                            <div class="input-group mb-3 " style="width: 80%">
                                <input type="file" accept=".png, .jpg, .jpeg, .pdf" @click="inputFile" class="form-control" ref="fileFromInput" multiple>
                            </div>
                        </div>

                        <b ref="fileErrMsg"></b>

                    </div>
                </div>
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-success">Update</button>
            </div>
            </div>
        </div>
    </div>


</template>

<script setup>
    import { ref } from 'vue';
    import Lightgallery from 'lightgallery/vue';
    import lgThumbnail from 'lightgallery/plugins/thumbnail';
    import lgZoom from 'lightgallery/plugins/zoom'

    let plugins = ref([lgThumbnail, lgZoom])
</script>

<style scoped>
@import 'lightgallery/css/lightgallery.css';
@import 'lightgallery/css/lg-thumbnail.css';
@import 'lightgallery/css/lg-zoom.css';

.stepper {
  .line {
    width: 2px;
    background-color: lightgrey !important;
  }
}

.timeline-header{
    font-size: 20px;
}

.timeline-about{
    font-size: 17px;
}

.btn{
    height: fit-content;
}

.date{
    font-size: 15px;
}
</style>