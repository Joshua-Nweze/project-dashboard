<template>
    <div class="row mt-5 align-items-center">
        <div class="col-lg-8 col-sm-12 col-md-8 mt-3">
            <canvas id="myGraphChart"></canvas>
        </div>
        <div class="col-lg-4 col-12 col-md-4 mt-5">
            <div class="card">
                <div class="card-body">
                    <div class="fs-3 text-secondary">File Categories</div>
                    <div class="list-group" v-for="category in categories" :key="category.index">
                        <router-link :to="`/files/${category.split(' ').join('-')}`" class="router-link">
                            <a href="#" class="list-group-item list-group-item-action mb-1">{{ category }}</a>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { useFiles } from "@/store/useFiles"
import { onMounted } from "@vue/runtime-core";
    import { storeToRefs } from "pinia";
    import Chart from 'chart.js/auto';

    let files = useFiles()
    let file = storeToRefs(files)
    let {getCat} = files

    let categories = getCat()

    onMounted(() => {
        const graph = document.getElementById('myGraphChart')

        new Chart(graph, {
            type: 'line',
         data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
            datasets: [{
            label: 'My Graph',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
        }
    })
        })
</script>

<style scoped>

</style>