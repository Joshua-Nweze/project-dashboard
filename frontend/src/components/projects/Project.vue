<template>
    <div>
        <div class="container" v-if="isDataReady">
            <div v-if="status" class="row">
                <div v-if="status == 200" class="col-md-8 offset-md-2">
                    <div class="row">
                        <div class="col-8 fs-3">{{ (project.project.projectName).toUpperCase() }}</div>
                        <div class="col-4 fs-3 d-flex justify-content-end" v-if="user.userType == 'staff'">
                            <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal"
                                data-bs-target="#exampleModal">Update</button>
                        </div>
                    </div>

                    <div class="fs-5 mt-3" v-if="user.userType == 'admin'">Ekene Okoi</div>

                    <div class="text-muted my-3">{{ (project.project.description) }}</div>
                    <div class="text-muted">
                        Started on : {{ new Date(project.project.startDate).toDateString() }}.
                        Ended on: {{ (project.project.endDate) == null ? 'Project is ongoing' : new
                            Date(project.project.endDate).toDateString() }}
                    </div>

                    <div v-if="(project.project.milestone).length > 0" class="stepper d-flex flex-column mt-4 ml-2">
                        <!--  v-if="(project.project.milestone).length > 0" -->
                        <div class="d-flex mb-1 mt-3">
                            <div class="d-flex flex-column pr-4 align-items-center">
                                <div class="rounded-circle py-2 px-2 bg-primary text-white mb-1"></div>
                                <div class="line h-100"></div>
                            </div>
                            <div class="ms-3">
                                <div class="text-dark timeline-header">Create your application respository</div>
                                <span class="text-muted date">Date</span>
                                <p class="lead text-muted timeline-about">Choose your website name & create repository</p>

                                <Lightgallery :settings="{ speed: 500, plugins: plugins }" :onInit="onInit"
                                    :onBeforeSlide="onBeforeSlide" class="row">
                                    <a href="https://image.freepik.com/free-photo/stylish-young-woman-with-bags-taking-selfie_23-2147962203.jpg"
                                        class="col-lg-3 col-md-4 col-6 col-sm my-1" data-fancybox-group="light">
                                        <img class="img-fluid"
                                            src="https://image.freepik.com/free-photo/stylish-young-woman-with-bags-taking-selfie_23-2147962203.jpg"
                                            alt="">
                                    </a>
                                    <a href="https://image.freepik.com/free-photo/pretty-girl-near-car_1157-16962.jpg"
                                        class="col-lg-3 col-md-4 col-6 col-sm my-1" data-fancybox-group="light">
                                        <img class="img-fluid"
                                            src="https://image.freepik.com/free-photo/pretty-girl-near-car_1157-16962.jpg"
                                            alt="">
                                    </a>
                                </Lightgallery>
                            </div>
                        </div>

                    </div>
                </div>

                <div v-else>
                    <div class="text-center fs-3 mt-5">
                        {{ project.message }}. <br>
                        <div class="fs-5 text-muted">Are you sure the link is correct? </div>
                    </div>
                </div>
            </div>

            <div v-else>
                <LoadingSpinner />
            </div>

            <!-- update modal -->
            <div v-if="status == 200" class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">

                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Project update</h1>
                            <button @click="clearFeedbackAndStatus" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div class="modal-body">

                            <div v-if="feedback">
                                <div class="alert alert-dismissible fade show"
                                    :class="{ 'alert-success': feedbackStatus == 200 || feedbackStatus == 201, 'alert-danger': feedbackStatus != 200 }"
                                    role="alert">
                                    {{ feedback }}
                                    <button type="button" class="btn-close" @click="clearFeedbackAndStatus"></button>
                                </div>
                            </div>

                            <label class="" for="milestone">Milestone</label>
                            <input type="text" class="form-control" id="milestone">

                            <label class="mt-4" for="description">Milestone description</label>
                            <textarea type="text" class="form-control" id="description"></textarea>

                            <div class="mt-4">Attach document ( image(s) )</div>
                            <div class="attach-doc-div text-center " ref="dragArea" @dragover="dragOver"
                                @dragleave="dragLeave" @drop="dragDrop">
                                <div ref="fileFeedback"></div>
                                <span><i class="bi bi-upload fs-1 text-secondary"></i> <br> Drag and drop here</span> <br>
                                <span>or</span> <br>
                                <div>
                                    Select file <br>

                                    <div class="d-flex justify-content-center mt-3">
                                        <div class="input-group mb-3 " style="width: 80%">
                                            <input type="file" accept=".png, .jpg, .jpeg, .pdf" @click="inputFile"
                                                class="form-control" ref="fileFromInput" multiple>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <span>
                                <span v-if="!project.project.endDate">
                                    <button v-if="!isUpdatingProjectStatus" type="button" class="btn btn-outline-success"
                                        @click="markProjectAsFinished(project.project._id, user.id)">Mark as
                                        finised</button>

                                    <span v-else class="px-3">
                                        <SmallLoadingSpinner />
                                    </span>
                                </span>

                                <span v-if="project.project.endDate">
                                    <button  v-if="!isUpdatingProjectStatus" type="button" class="btn btn-outline-secondary"
                                        @click="unmarkProjectAsFinished(project.project._id, user.id)">Mark as
                                        unfinised</button>

                                        <span v-else class="px-3">
                                            <SmallLoadingSpinner />
                                        </span>
                                </span>

                            </span>

                            <button type="button" class="btn btn-success">Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-else>
            <LoadingSpinner />
        </div>
    </div>
</template>

<script setup>
import { inject, ref } from 'vue';
import Lightgallery from 'lightgallery/vue';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom'
import { useRoute } from 'vue-router';
import { useProjects } from '@/store/useProjects';
import LoadingSpinner from '../LoadingSpinner.vue';
import { useUser } from '@/store/useUser';
import { storeToRefs } from 'pinia';
import SmallLoadingSpinner from '../SmallLoadingSpinner.vue';

let projectsStore = useProjects()
let userStore = useUser()

let { user } = storeToRefs(userStore)
let { project } = storeToRefs(projectsStore)

let plugins = ref([lgThumbnail, lgZoom])

let route = useRoute()

let userEmail = inject('userEmail')

let isDataReady = ref(false)
let status = ref(null)

async function getDataOnLoad() {
    if (!user.value) {
        await userStore.getUserDetails(userEmail)
    }

    let req = await projectsStore.getProject(route.params.id)
    console.log(project.value)

    status.value = req.status
    isDataReady.value = true
}
getDataOnLoad()

let feedback = ref(null)
let feedbackStatus = ref(null)
let isUpdatingProjectStatus = ref(false)

async function markProjectAsFinished(projectId, staffId) {
    isUpdatingProjectStatus.value = true

    let req = await projectsStore.markProjectAsFinished(projectId, staffId)

    feedback.value = req.res.message
    feedbackStatus.value = req.status

    isUpdatingProjectStatus.value = false

    setTimeout(() => {
        clearFeedbackAndStatus()
    }, 5000)
}

async function unmarkProjectAsFinished(projectId, staffId) {
    isUpdatingProjectStatus.value = true

    let req = await projectsStore.unmarkProjectAsFinished(projectId, staffId)

    feedback.value = req.res.message
    feedbackStatus.value = req.status


    isUpdatingProjectStatus.value = false

    setTimeout(() => {
        clearFeedbackAndStatus()
    }, 5000)
}

function clearFeedbackAndStatus() {
    feedback.value = feedbackStatus.value = null
}
</script>

<style scoped>
@import 'lightgallery/css/lightgallery.css';
@import 'lightgallery/css/lg-thumbnail.css';
@import 'lightgallery/css/lg-zoom.css';

.line {
    width: 2px;
    background-color: lightgrey !important;
}

.timeline-header {
    font-size: 20px;
}

.timeline-about {
    font-size: 17px;
}

.btn {
    height: fit-content;
}

.date {
    font-size: 15px;
}
</style>