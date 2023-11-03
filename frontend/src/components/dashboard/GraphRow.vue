<template>
    <div class="row mt-5 d-flex align-items-center">
        <div class="col-lg-8 col-sm-12 col-md-12 order-md-3 order-lg-1 mt-4 mb-5">
            <canvas id="myBarChart"></canvas>
        </div>

        <div class="col-lg-4 col-sm-12 col-md-6 order-md-2 order-lg-2 mt-4 mb-5">
            <canvas id="myPieChart"></canvas>
        </div>

        <div class="col-lg-4 col-12 col-sm-12 col-md-6 mt-4 mb-5 order-lg-3 order-md-2">
            <div class="card">
                <div class="card-body">
                    <div class="fs-3 text-success">Recent staff</div>
                    <div class="list-group p-1 px-2 my-2 recent-project bg-success-subtle">
                        <div>Ekene Okoi</div>
                        <div class="text-muted" style="font-size: 13px;">Registered on date</div>
                    </div>
                    <div class="list-group p-1 px-2 my-2 recent-project bg-success-subtle">
                        <div>Ekene Okoi</div>
                        <div class="text-muted" style="font-size: 13px;">Registered on date</div>
                    </div>
                    <div class="list-group p-1 px-2 my-2 recent-project bg-success-subtle">
                        <div>Ekene Okoi</div>
                        <div class="text-muted" style="font-size: 13px;">Registered on date</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-lg-8 col-sm-12 col-md-12 mt-4 mb-5 order-lg-5">
            <canvas id="myBarChart2"></canvas>
        </div>

    </div>

    
</template>

<script setup>
import Chart from 'chart.js/auto';
import { onMounted, ref } from "@vue/runtime-core";
import { useProjects } from '@/store/useProjects';
import { storeToRefs } from 'pinia';

let projectsStore = useProjects()

    // onCreated(async () => {
    //     await projectsStore.getStaffProjects('6540f9ca19e8035e4f45a4a9')
    // })
    // let { projects } = storeToRefs(projectsStore)
    // console.log(projects.value)


let num1 = ref(10)
onMounted(() => {
    const bar = document.getElementById('myBarChart')
    const pie = document.getElementById('myPieChart')
    const bar2 = document.getElementById('myBarChart2')

    new Chart(bar, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: '# of projects started per month',
                data: [12, 19, 3, 5, 2, 3, num1.value],
                borderWidth: 1,
                height: 100
            }]
        },
        options: {
        scales: {
            y: {
                beginAtZero: true
                }
            }
        }
    });

    new Chart(pie, {
        type: 'pie',
        data: {
            labels: ['Completed projects', 'Ongoing projects'],
            datasets: [{
                label: 'Projects highlight',
                data: [5, 2],
                backgroundColor: ['rgba(0, 225, 0, 0.5)', 'rgba(255, 255, 0, 0.5)'],
                borderWidth: 1
            }]
        },
        options: {
        scales: {
            y: {
            beginAtZero: true
            }
        }
        }
    });

    new Chart(bar2, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: '# of projects completed per month',
                data: [12, 19, 3, 5, 2, 3, num1.value],
                borderWidth: 1,
                backgroundColor: 'rgba(0, 225, 0, 0.2)',
                borderColor: 'rgba(0, 225, 0)',
                height: 100
            }]
        },
        options: {
        scales: {
            y: {
                beginAtZero: true
                }
            }
        }
    });
})


</script>

<style scoped>
    .div-list{
        padding: 10px 0;
        border-bottom: 1px solid #c8c9ca;
    }

</style>