<template>
    <div class="row" v-if="isDataReady">
        <div class="">
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
                                            <div style="font-size: 14px;"
                                                v-if="(typeof ongoingProjects != 'string' && ongoingProjects.length > 0)">
                                                You have {{ ongoingProjects.length }} ongoing projects. <br> Keep it going.
                                            </div>
                                            <div v-else>
                                                <RouterLink to="/add-project" class="btn btn-outline-light">Add a project
                                                </RouterLink>
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
                <div v-if="user.userType == 'admin'" class="row mx-auto d-flex">
                    <div class="col-lg-6 col-sm-6 col-md-6 mb-2">
                        <div class="card bg-primary-subtle h-100">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-4 card-icon text-primary"><i class="bi bi-cone"></i></div>
                                    <div class="col-8 card-text text-end">
                                        <span class="text-body-secondary">Total projects</span>
                                        <br>
                                        <span class="fs-1">
                                            {{ typeof allProjects == 'object' || typeof allProjects == 'array' ?
                                                allProjects.length : 0 }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-6 col-sm-6 col-md-6 mb-2">
                        <div class="card bg-warning-subtle h-100">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-4 card-icon text-warning"><i class="bi bi-cone"></i></div>
                                    <div class="col-8 card-text text-end">
                                        <span class="text-body-secondary">Ongoing projects</span>
                                        <br>
                                        <span class="fs-1">
                                            {{ typeof allOngoingProjects == 'object' || typeof allOngoingProjects == 'array'
                                                ? allOngoingProjects.length : 0 }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-6 col-sm-6 col-md-6 mb-2">
                        <div class="card bg-success-subtle h-100">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-4 card-icon text-success"><i class="bi bi-cone"></i></div>
                                    <div class="col-8 card-text text-end"><span class="text-body-secondary">Finished
                                            projects</span> <br>
                                        <span class="fs-1">
                                            {{ typeof allFinishedProjects == 'object' || typeof allFinishedProjects ==
                                                'array' ? allFinishedProjects.length : 0 }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-6 col-sm-6 col-md-6 mb-2">
                        <div class="card bg-dark-subtle h-100">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-4 card-icon text-dark"><i class="bi bi-person"></i></div>
                                    <div class="col-8 card-text text-end"><span class="text-body-secondary">Staff </span>
                                        <br> <span class="fs-1">{{ typeof staff == 'object' || typeof staff == 'array' ?
                                            staff.length : 0 }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-12">
                        <div class="card my-4">
                            <div class="card-body">
                            <div class="fs-5 ">Unanswered staff invites</div>
                                <div class="row my-2">
                                    <div class="col-1">1</div>
                                    <div class="col-7">row</div>
                                    <div class="col-4 d-flex justify-content-end">row</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- STAFF -->
                <div v-if="user.userType == 'staff'" class="row row-gap-3 mb-3 mx-auto d-flex">
                    <div class="col-12 col-lg-4">
                        <div class="card bg-primary-subtle h-100">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-4 card-icon text-primary"><i class="bi bi-cone"></i></div>
                                    <div class="col-8 card-text text-end">
                                        <span class="text-body-secondary">Total projects</span>
                                        <br>
                                        <span class="fs-1">
                                            {{ typeof projects == 'object' || typeof projects == 'array' ? projects.length :
                                                0 }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-lg-4">
                        <div class="card bg-warning-subtle h-100">
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
                        <div class="card bg-success-subtle h-100">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-4 card-icon text-success"><i class="bi bi-cone"></i></div>
                                    <div class="col-8 card-text text-end">
                                        <span class="text-body-secondary">Finished projects</span>
                                        <br>
                                        <span class="fs-1">
                                            {{ typeof finishedProjects == null ? '0' : finishedProjects.length }}
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

    <div v-else class="m-5">
        <LoadingSpinner />
    </div>

    <div class="my-3">
        <canvas id="myGraphChart"></canvas>
    </div>
</template>

<script setup>
import { reactive, ref } from "@vue/reactivity";
import { storeToRefs } from "pinia";
import { inject } from 'vue'
import { useUser } from "@/store/useUser";
import { useAdmin } from "@/store/useAdmin";
import { useProjects } from "@/store/useProjects";
import Chart from 'chart.js/auto';

import LoadingSpinner from "../LoadingSpinner.vue";

let userStore = useUser()
let projectsStore = useProjects()
let adminStore = useAdmin()

let { user } = storeToRefs(userStore)
let { projects, ongoingProjects, finishedProjects } = storeToRefs(projectsStore)
let { staff, allProjects, allFinishedProjects, allOngoingProjects } = storeToRefs(adminStore)

const userEmail = inject('userEmail')

let isDataReady = ref(false)

async function getDataOnLoad() {
    if (!user.value) {
        await userStore.getUserDetails(userEmail)
    }




    if (user.value.userType == 'staff') {
        await projectsStore.getStaffProjects(user.value.id)

        // bar chart for user
        const graph = document.getElementById('myGraphChart')
        new Chart(graph, {
            type: 'bar',
            data: {
                labels: ['Finished', 'Ongoning'],
                datasets: [{
                    label: 'Project stats',
                    data: [finishedProjects.value.length, ongoingProjects.value.length],
                    fill: false,
                    backgroundColor: ['#8dcc8d', '#fff3cd'],
                    tension: 0.1
                }]
            },
            options: {
                indexAxis: 'y',
            }
        })
    } else {
        await adminStore.getAllProjects(user.value.id)

        // bar chart for admin
        const graph = document.getElementById('myGraphChart')
        new Chart(graph, {
            type: 'bar',
            data: {
                labels: ['Total Finished', 'Total Ongoning'],
                datasets: [{
                    label: 'Total project stats',
                    data: [allFinishedProjects.value.length, allOngoingProjects.value.length],
                    fill: false,
                    backgroundColor: ['#8dcc8d', '#fff3cd'],
                    tension: 0.1
                }]
            },
            options: {
                indexAxis: 'y',
            }
        })
    }

    if (user.value.userType == 'admin') {
        await adminStore.getAllStaff(user.value.id)
    }

    isDataReady.value = true
}
getDataOnLoad()

</script>

<style scoped>
.card-icon {
    font-size: 40px;
}

.card-text {
    line-height: 25px;
}
</style>