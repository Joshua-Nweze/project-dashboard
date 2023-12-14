<template>
    <div>
        <div v-if="error">
            <ErrorReload />
        </div>
        <div v-else>
            <div v-if="isDataReady" class="">

                <div v-if="typeof projects == 'array' || typeof projects == 'object'">
                    <div class="row px-md-2">
                        <div class="input-group mb-5">
                            <input type="text" class="form-control" placeholder="Search project" aria-label="Recipient's username" aria-describedby="basic-addon2">
                            <span class="input-group-text" id="basic-addon2"><i class="bi bi-search"></i> <span class="ms-1 d-none d-md-inline">Search</span></span>
                         </div>
                    </div>

                    <div class="row flex justify-content-center gap-2 px-md-2">
                        <!-- STAFF -->
                        <div v-if="user.userType == 'staff'" v-for="(project, index) in projects" :key="index"
                            class="card col-sm-12 col-md-3 col-lg-4 col-4 px-0" style="width: 16rem;">
                            <div class="position-relative">
                                <img :src="`data:image/jpeg;base64,${project.image.imageBase64}`" class="card-img-top px-0"
                                    alt="project image thumbnail" style="height: 200px;">
                                <!-- Only for staff -->
                                <div v-if="user.userType == 'staff'" class="position-absolute top-0 end-0 p-2">
                                    <ProjectActionBtns :user="user" :project="project" :editModalId="`editModalId${index}`"
                                        :deleteModalId="`deleteModalId${index}`" />
                                </div>
                                <!--  -->
                            </div>
                            <div class="card-body px-2">
                                <h5 class="card-title col">{{ project.projectName }}</h5>

                                <p class="card-text mt-2">{{ (project.description).slice(0, 95) }} {{
                                    (project.description).length > 95 ? '...' : '' }}</p>
                                <RouterLink :to="`/project/${project._id}`" class="btn btn-primary">See more</RouterLink>
                            </div>
                        </div>

                        <!-- ADMIN -->
                        <div v-if="user.userType == 'admin'" v-for="(project, index) in allProjects" :key="index"
                            class="card col-sm-12 col-md-3 col-lg-4 col-4 px-0" style="width: 16rem;">
                            <div class="position-relative">
                                <img :src="`data:image/jpeg;base64,${project.image.imageBase64}`" class="card-img-top px-0"
                                    alt="project image thumbnail" style="height: 200px;">
                            </div>
                            <div class="card-body px-2">
                                <h5 class="card-title col">{{ project.projectName }}</h5>

                                <p class="card-text mt-2">{{ (project.description).slice(0, 95) }} {{
                                    (project.description).length > 95 ? '...' : '' }}</p>
                                <RouterLink :to="`/project/${project._id}`" class="btn btn-primary">See more</RouterLink>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <NothingToShow />
                </div>

            </div>
            <div v-else class="m-5">
                <LoadingSpinner />
            </div>
        </div>
    </div>
</template>

<script setup>
import ProjectActionBtns from '@/components/projects/ProjectActionBtns.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import { useUser } from '@/store/useUser';
import { useProjects } from '@/store/useProjects';
import { storeToRefs } from 'pinia';
import { inject, ref } from 'vue';
import NothingToShow from '../components/NothingToShow.vue'
import { useAdmin } from '@/store/useAdmin';
import ErrorReload from '@/components/ErrorReload.vue';

let userStore = useUser()
let { user } = storeToRefs(userStore)

let projectsStore = useProjects()
let { projects } = storeToRefs(projectsStore)

let adminStore = useAdmin()
let { allProjects } = storeToRefs(adminStore)

const userEmail = inject('userEmail')
let isDataReady = ref(true)
let error = ref(false)

async function getDataOnLoad() {
    if (!user.value) {
        isDataReady.value = false

        let req = await userStore.getUserDetails(userEmail)

        if (req.status == 500) {
            error.value = true
            return
        }

        if (user.value.userType == 'staff') {
            let req = await projectsStore.getStaffProjects(user.value.id)

            if (req.status == 500) {
                error.value = true
                return
            }

            isDataReady.value = true
        } else {
            await adminStore.getUnansweredInvites(user.value.id)
            await adminStore.getAllProjects(user.value.id)
            let req = await adminStore.getAllProjects(user.value.id)

            if (req.status == 500) {
                error.value = true
                return
            }

            projects.value = allProjects.value

            isDataReady.value = true
        }
    }
}
getDataOnLoad()

</script>

<style lang="scss" scoped></style>