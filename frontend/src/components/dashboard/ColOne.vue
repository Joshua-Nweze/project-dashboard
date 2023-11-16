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
                                            <div style="font-size: 14px;" v-if="(typeof ongoingProjects != 'string' && ongoingProjects.length > 0)">You have {{ ongoingProjects.length }} ongoing projects. <br> Keep it going.</div>
                                            <div v-else>
                                                <RouterLink to="/add-project" class="btn btn-outline-light">Add a project</RouterLink>
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
                                                {{ typeof allProjects == 'object' || typeof allProjects == 'array' ? allProjects.length : 0 }}
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
                                            {{ typeof allOngoingProjects == 'object' || typeof allOngoingProjects == 'array' ? allOngoingProjects.length : 0 }}
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
                                    <div class="col-8 card-text text-end"><span class="text-body-secondary">Finished projects</span> <br> 
                                        <span class="fs-1">
                                            {{ typeof allFinishedProjects == 'object' || typeof allFinishedProjects == 'array' ? allFinishedProjects.length : 0 }}
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
                                    <div class="col-8 card-text text-end"><span class="text-body-secondary">Staff   </span> <br> <span class="fs-1">{{ typeof staff == 'object' || typeof staff == 'array' ? staff.length : 0 }}</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- STAFF -->
                <div  v-if="user.userType == 'staff'" class="row row-gap-3 mb-3 mx-auto d-flex">
                    <div class="col-12 col-lg-4">
                        <div class="card bg-primary-subtle h-100">
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

        <div>
            <canvas id="myBarChart" ref="graph"></canvas>
        </div>

        <!-- <div class="col-lg-8 col-sm-12 col-md-12 order-md-3 order-lg-1 mt-4 mb-5">
            <canvas id="myBarChart"></canvas>
        </div>

        <div class="col-lg-4 col-sm-12 col-md-6 order-md-2 order-lg-2 mt-4 mb-5">
            <canvas id="myPieChart"></canvas>
        </div>

        <div class="col-lg-8 col-sm-12 col-md-12 mt-4 mb-5 order-lg-5">
            <canvas id="myBarChart2"></canvas> -->
        <!-- </div> -->

    </div>

    <div v-else class="m-5">
        <LoadingSpinner />
    </div>
</template>

<script setup>
import { reactive, ref } from "@vue/reactivity";
import { storeToRefs } from "pinia";
import { inject, onMounted } from 'vue'
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
    if (!user.value ) {
        await userStore.getUserDetails(userEmail)
    }

    if (user.value.userType == 'staff') {
        await projectsStore.getStaffProjects(user.value.id)
    } else {
        await adminStore.getAllProjects(user.value.id)
    }

    if(user.value.userType == 'admin') {
        await adminStore.getAllStaff(user.value.id)
    }
    isDataReady.value = true
}
getDataOnLoad()

// onMounted (() => {

//     const graphy = document.getElementById('myGraphChart')
//     // const ctx = graph.value.getContext('2d');
//     // console.log(graph.value)
//     new Chart(graphy, {
//         type: 'line',
//         data: {
//             labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
//             datasets: [{
//                 label: 'File Graph',
//                 data: [65, 59, 80, 81, 56, 55, 40],
//                 fill: false,
//                 borderColor: 'rgb(75, 192, 192)',
//                 tension: 0.1
//             }]
//         }
//     })
//         const bar = document.getElementById('myBarChart')
//         // const pie = document.getElementById('myPieChart')
//         // const bar2 = document.getElementById('myBarChart2')
//         new Chart(bar, {
//             type: 'bar',
//             data: {
//                 labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
//                 datasets: [{
//                     label: '# of projects started per month',
//                     data: [12, 19, 3, 5, 2, 3],
//                     borderWidth: 1,
//                     height: 100
//                 }]
//             },
//             options: {
//             scales: {
//                 y: {
//                     beginAtZero: true
//                     }
//                 }
//             }
//         });
//         // new Chart(pie, {
//         //     type: 'pie',
//         //     data: {
//         //         labels: ['File1', 'File2', 'File3'],
//         //         datasets: [{
//         //             label: 'Projects highlight',
//         //             data: [5, 8, 8],
//         //             borderWidth: 1
//         //         }]
//         //     },
//         //     options: {
//         //     scales: {
//         //         y: {
//         //         beginAtZero: true
//         //         }
//         //     }
//         //     }
//         // });
//         // new Chart(bar2, {
//         //     type: 'bar',
//         //     data: {
//         //         labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
//         //         datasets: [{
//         //             label: '# of projects completed per month',
//         //             data: [12, 19, 3, 5, 2, 3, 2],
//         //             borderWidth: 1,
//         //             backgroundColor: 'rgba(0, 225, 0, 0.2)',
//         //             borderColor: 'rgba(0, 225, 0)',
//         //             height: 100
//         //         }]
//         //     },
//         //     options: {
//         //     scales: {
//         //         y: {
//         //             beginAtZero: true
//         //             }
//         //         }
//         //     }
//         // });
// })

</script>

<style scoped>
.card-icon{
    font-size: 40px;
}

.card-text{
    line-height: 25px;
}

</style>