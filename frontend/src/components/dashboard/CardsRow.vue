<template>
    <div class="row" v-if="isDataReady">

        <div class="col-12 col-md-8">
            <div class="row">
                <div class="col-12">
                    <div class="card bg-primary mb-2">
                        <div class="card-body p-0">
                            <div class="row align-items-center">

                                <div class="col">
                                    <img src="../../assets/imgs/engineer.png" alt="" class="img-fluid">
                                </div>

                                <div class="col text-white p-3">
                                    <div v-if="user.userType == 'staff'">
                                        <div class="fs-3 fw-bold">{{ user.name }}!</div>
                                        <div>
                                            <div style="font-size: 14px;" v-if="ongoingProjects.length > 0">You have {{ ongoingProjects.length }} ongoing projects. <br> Keep it going.</div>
                                            <div v-else>
                                                <RouterLink to="/add-project">Add a project</RouterLink>
                                            </div>
                                        </div>
                                    </div>

                                    <div v-if="user.userType == 'admin'">
                                        <div class="fs-3 fw-bold">Hello Admin!</div>
                                        <div style="font-size: 14px;">Welcome back.</div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <!-- ADMIN -->
                <div v-if="user.userType == 'admin'" class="row  mx-auto">
                    <div class="col-lg-6 col-sm-6 col-md-6 mb-2">
                        <div class="card bg-primary-subtle">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-4 card-icon text-primary"><i class="bi bi-cone"></i></div>
                                    <div class="col-8 card-text text-end">
                                        <span class="text-body-secondary">Total projects</span> 
                                        <br> 
                                            <span class="fs-1">
                                                0
                                            </span>
                                        </div>
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
                                            0
                                        </span>
                                    </div>
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- STAFF -->
                <div  v-if="user.userType == 'staff'" class="row row-gap-3 mb-3 mx-auto">
                    <div class="col-12 col-lg-4">
                        <div class="card bg-primary-subtle">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-4 card-icon text-primary"><i class="bi bi-cone"></i></div>
                                    <div class="col-8 card-text text-end">
                                        <span class="text-body-secondary">Total projects</span> 
                                        <br> 
                                            <span class="fs-1">
                                                {{ typeof projects == 'object' || typeof projects == 'array' ? projects.length : 0 }}
                                            </span>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-lg-4">
                        <div class="card bg-warning-subtle">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-4 card-icon text-warning"><i class="bi bi-cone"></i></div>
                                    <div class="col-8 card-text text-end">
                                        <span class="text-body-secondary">Ongoing projects</span> 
                                        <br> 
                                        <span class="fs-1">
                                            {{ (ongoingProjects).length }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-lg-4">
                        <div class="card bg-success-subtle">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-4 card-icon text-success"><i class="bi bi-cone"></i></div>
                                    <div class="col-8 card-text text-end">
                                        <span class="text-body-secondary">Finished projects</span>
                                        <br> 
                                        <span class="fs-1">{{ typeof finishedProjects == null ? '0' : finishedProjects.length }}</span></div>
                                </div>
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
                    <div
                     v-if="(typeof projects == 'object' || typeof project == 'array')"
                     v-for="(project, index) in (projects).slice(0, 4)"
                     :key="project.index"
                     class="list-group p-1 px-2 my-2 recent-project">
                        <RouterLink :to="`/project/${project.project._id}`" class="link">
                            <div class="fs-5 text-muted">{{ project.project.projectName }}</div>
                            <div class="text-muted" style="font-size: 13px;">{{ (project.project.description).slice(0, 20) }} {{ (project.project.description).length > 20 ? '...' : '' }}</div>
                        </RouterLink>
                    </div>
                    <div v-else>
                        No recent project
                    </div>
                </div>
            </div>
        </div>

    </div>

    <div v-else class="m-5">
        <LoadingSpinner />
    </div>
</template>

<script setup>
import { reactive, ref } from "@vue/reactivity";
import { storeToRefs } from "pinia";
import { inject } from 'vue'
import { useUser } from "@/store/useUser";
import { useProjects } from "@/store/useProjects";

import LoadingSpinner from "../LoadingSpinner.vue";

let userStore = useUser()
let projectsStore = useProjects()

let { user } = storeToRefs(userStore)
let { projects, ongoingProjects, finishedProjects } = storeToRefs(projectsStore)

const userEmail = inject('userEmail')

let isDataReady = ref(false)

async function getDataOnLoad() {
    if (!user.value ) {
        await userStore.getUserDetails(userEmail)

        await projectsStore.getStaffProjects(user.value.id)
        console.log(projects.value)
    }
    isDataReady.value = true
}
getDataOnLoad()

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

.link{
    text-decoration: none;
}
</style>