<template>
    <div>
        <div class="container" v-if="isDataReady">
            <div v-if="status" class="row">
                <div v-if="status == 200" class="col-md-8 offset-md-2">
                    <div class="row">
                        <div class="col-9 col-lg-10 fs-3">{{ (project.projectName).toUpperCase() }}</div>
                        <div class="col-3 col-lg-2 fs-3 d-flex justify-content-end" v-if="user.userType == 'staff'">
                            <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal"
                                data-bs-target="#updateModal">Update</button>
                        </div>
                    </div>

                    <div class="fs-5 mt-3" v-if="user.userType == 'admin'">{{ usersName }}</div>

                    <div class="text-muted my-3">{{ (project.description) }}</div>
                    <div class="text-muted">
                        Started on : {{ new Date(project.startDate).toDateString() }}.
                        Ended on: {{ (project.endDate) == null ? 'Project is ongoing' : new
                            Date(project.endDate).toDateString() }}
                    </div>

                    <div v-if="(project.milestone).length > 0" class="stepper d-flex flex-column mt-4 ml-2">
                        <div class="d-flex mb-1 mt-3" v-for="(milestone, index) in project.milestone" :key="index">
                            <div class="d-flex flex-column pr-4 align-items-center">
                                <div class="rounded-circle py-2 px-2 bg-primary text-white mb-1"></div>
                                <div class="line h-100"></div>
                            </div>
                            <div class="ms-3">
                                <div class="text-dark timeline-header">{{ milestone.milestone }}</div>
                                <p class="lead text-muted timeline-about" v-if="milestone.description">{{
                                    milestone.description }}</p>
                                <div class="text-muted date">Date: {{ new Date(milestone.date).toDateString() }}</div>

                                <Lightgallery v-if="milestone.images.length > 0" :settings="{ speed: 500, plugins: plugins }" :onInit="onInit"
                                    :onBeforeSlide="onBeforeSlide" class="row">
                                    <a v-for="image in milestone.images" :href="`data:image/jpeg;base64,${image.imageBase64}`"
                                        class="col-lg-3 col-md-4 col-6 col-sm my-1" data-fancybox-group="light">
                                        <img class="img-fluid"
                                        :src="`data:image/jpeg;base64,${image.imageBase64}`"
                                            alt="milestone image">
                                    </a>
                                </Lightgallery>

                                <div v-if="user.userType == 'staff'" class="btn btn-outline-danger mt-3" data-bs-toggle="modal"  :data-bs-target="`#del_milestone_${index}`">
                                    Delete milestone
                                </div>

                                <!-- del milstone modal -->
                                <div class="modal fade"
                                    :id="`del_milestone_${index}`" tabindex="-1" aria-labelledby="delMilestoneLabel"
                                    aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">

                                            <div class="modal-header">
                                                <h1 class="modal-title fs-5" id="delMilestoneLabel">Delete '{{ milestone.milestone }}' milestone</h1>
                                                <button @click="deleteMilestoneFeedback = null" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>

                                            <div class="modal-body">

                                                <div v-if="deleteMilestoneFeedback">
                                                    <div class="alert alert-dismissible fade show" :class="{ 'alert-success': deleteMilestoneStatus == 200 || deleteMilestoneStatus == 201,  'alert-danger':   deleteMilestoneStatus != 200 }"
                                                        role="alert">
                                                        {{ deleteMilestoneFeedback }}
                                                        <button type="button" class="btn-close"
                                                            @click="deleteMilestoneFeedback = null"></button>
                                                    </div>
                                                </div>

                                                <div class="alert alert-danger">
                                                    Are you sure you want to delete milestone?
                                                </div>

                                            </div>
                                            <div class="modal-footer">

                                                <span>
                                                    <button type="button" class="btn btn-outline-danger" @click="deleteMilestone(project._id, milestone._id, user.id)" data-bs-dismiss="modal">
                                                        <span v-if="!isDeletingMilestone">Delete milestone</span>
                                                        <span v-else class="px-3"><SmallLoadingSpinner /></span>
                                                    </button>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div v-else>
                    <div class="text-center fs-3 mt-5">
                        {{ project.message }} <br>
                        <div class="fs-5 text-muted">Are you sure the link is correct? </div>
                    </div>
                </div>
            </div>

            <div v-else>
                <LoadingSpinner />
            </div>

            <!-- update modal -->
            <div v-if="status == 200" class="modal fade" id="updateModal" tabindex="-1" aria-labelledby="updateModalLabel"
                aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">

                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="updateModalLabel">Project update</h1>
                            <button @click="clearFeedbackAndStatus" type="button" class="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
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
                            <input type="text" class="form-control" id="milestone" v-model="milestone">

                            <label class="mt-4" for="description">Milestone description</label>
                            <textarea type="text" class="form-control" id="description"
                                v-model="milestoneDescription"></textarea>

                            <div class="mt-4">Attach document ( image(s) )</div>
                            <div class="attach-doc-div text-center">
                                <div ref="fileFeedback"></div>
                                <div class="mt-3">
                                    Select file <br>

                                    <div class="d-flex justify-content-center mt-3">
                                        <div class="input-group mb-3 " style="width: 80%">
                                            <input type="file" accept=".png, .jpg, .jpeg" @change="handleFileChange" class="form-control" ref="fileFromInput" multiple>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <span>
                                <span v-if="!project.endDate">
                                    <button v-if="!isUpdatingProjectStatus" type="button" class="btn btn-outline-success"
                                        @click="markProjectAsFinished(project._id, user.id)"> Mark as
                                        finised
                                    </button>

                                    <button v-else class="btn btn-outline-success px-3">
                                        <SmallLoadingSpinner />
                                    </button>
                                </span>

                                <span v-if="project.endDate">
                                    <button v-if="!isUpdatingProjectStatus" type="button" class="btn btn-outline-secondary"
                                        @click="unmarkProjectAsFinished(project._id, user.id)">Mark as
                                        unfinised</button>

                                    <button v-else class="btn btn-outline-secondary px-3">
                                        <SmallLoadingSpinner />
                                    </button>
                                </span>

                            </span>

                            <button type="button" class="btn btn-success" @click="addMilestone">
                                <span v-if="!addingMilestone">Add milestone</span>
                                <span v-else class="px-2">
                                    <SmallLoadingSpinner />
                                </span>
                            </button>
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
import { inject, onMounted, ref, onUnmounted } from 'vue';
import Lightgallery from 'lightgallery/vue';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom'
import { useRoute } from 'vue-router';
import { useProjects } from '@/store/useProjects';
import LoadingSpinner from '../LoadingSpinner.vue';
import { useUser } from '@/store/useUser';
import { storeToRefs } from 'pinia';
import SmallLoadingSpinner from '../SmallLoadingSpinner.vue';
import { useAdmin } from '@/store/useAdmin';

let projectsStore = useProjects()
let userStore = useUser()
let adminStore = useAdmin()

let { user } = storeToRefs(userStore)
let { project } = storeToRefs(projectsStore)

let plugins = ref([lgThumbnail, lgZoom])

let route = useRoute()

let userEmail = inject('userEmail')
let apihost = inject('apihost')

let isDataReady = ref(false)
let status = ref(null)

let usersName = ref(null)

async function getDataOnLoad() {
    let req = await projectsStore.getProject(route.params.id)

    if (user.value.userType == 'admin') {
        let getUserNameReq = await viewUser(project.value.staff)
        usersName.value = getUserNameReq.message.user.name
    }

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
    feedback.value = null
    feedbackStatus.value = null
}

async function viewUser(id) {
    let req = await fetch(`${apihost}/api/admin/view-user-details?id=${id}`)
    let res = await req.json()

    return res
}

let isDeletingMilestone = ref(false)
let deleteMilestoneFeedback = ref(null)
let deleteMilestoneStatus = ref(null)

async function deleteMilestone(projectId, milestoneId, staffId) {
    isDeletingMilestone.value = true

    let req = await projectsStore.deleteMilestone(projectId, milestoneId, staffId)
    deleteMilestoneFeedback.value = req.res.message
    deleteMilestoneStatus = req.status

    isDeletingMilestone.value = false
    deleteMilestoneFeedback.value = null
}

let milestone = ref('')
let milestoneDescription = ref('')
let addingMilestone = ref(false)
let images = ref([])

function handleFileChange(event) {
    for (const image of (event.target.files)) {
        images.value.push(image)
    }
    console.log(images.value)
}

async function addMilestone() {
    
    if (!navigator.onLine) {
        feedback.value = 'Looks like you don\'t have an active internet connection'
        loading.value = false
        return
    }

    if (!user.value.id) {
        feedback.value = 'User not found'
        return
    }

    if (!milestone.value || !milestoneDescription.value) {
        feedback.value = 'All inputs are required'
        return
    }

    addingMilestone.value = true

    const formData = new FormData();

    formData.append('milestone', milestone.value)
    formData.append('milestoneDescription', milestoneDescription.value)
    formData.append('staff', user.value.id)
    formData.append('id', project.value._id)

    const fileInput = images.value;
    for (let i = 0; i < fileInput.length; i++) {
        console.log(fileInput[i])
      formData.append('images', fileInput[i]);
    }
    console.log(fileInput)

    console.log([...formData.entries()]);

    let req = await fetch(`${apihost}/api/projects/add-project-milestone`, {
        method: 'PATCH',
        body: formData
    })

    let res = await req.json()

    feedbackStatus.value = req.status
    feedback.value = res.message

    addingMilestone.value = false

    await projectsStore.getProject(project.value._id)


    milestone.value = milestoneDescription.value = ''

    setTimeout(() => {
        clearFeedbackAndStatus()
    }, 5000)
}

function deleteMilestoneFeedbackAndStatus() {
    deleteMilestoneFeedback.value = deleteMilestoneStatus.value = null
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