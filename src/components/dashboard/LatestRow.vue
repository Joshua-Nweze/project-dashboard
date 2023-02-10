<template>
    <div class="row mt-5 d-flex align-items-center">
        <div class="col-lg-3 col-sm-12 col-md-6 order-md-1 order-lg-1">
            <div class="card">
                <div class="card-body">
                    <span class="fs-3 text-body-secondary">Latest uploads</span> <br>
                    <span class="fs-6">Top 5 latest files</span>
                    <hr>
                    
                    <div class="list-group" v-for="file in fileDetails.slice(0, 5)" :key="file.index">
                        <!-- <div class="div-list"></div> -->
                        <a href="#" class="list-group-item list-group-item-action mb-1">{{ file.title }}</a>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-lg-5 col-sm-12 col-md-12 order-md-3 order-lg-2 mt-4">
            <canvas id="myBarChart"></canvas>
        </div>

        <div class="col-lg-4 col-sm-12 col-md-6 order-md-2 order-lg-3 mt-4">
            <canvas id="myPieChart"></canvas>
        </div>
    </div>
</template>

<script setup>
    import { storeToRefs } from "pinia";
    import { useFiles } from "@/store/useFiles"
    import Chart from 'chart.js/auto';
    import { onMounted, ref } from "@vue/runtime-core";

    let files = useFiles()
    let {file, catArr} = storeToRefs(files)
    let fileDetails = file.value.files

    // for (let i = 0; i < fileDetails.length; i++) {
    //     console.log(fileDetails[i]);
        
    // }

    // let a = fileDetails.map(file => {
    //     if (file.category) {
    //         console.log('yes');
    //     }
    // })

    // for (let i = 0; i < catArr.size; i++) {
    //     console.log(catArr[i]);
        
    // }
    let num1 = ref(10)
    onMounted(() => {
        const bar = document.getElementById('myBarChart')
        const pie = document.getElementById('myPieChart')

        new Chart(bar, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: '# of uploads per month',
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
                labels: ['hujn', 'ujb', 'uy'],
                datasets: [{
                    label: '# of Votes',
                    data: [5, 8, 0, 8],
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
    })
    

</script>

<style scoped>
    .div-list{
        padding: 10px 0;
        border-bottom: 1px solid #c8c9ca;
    }
</style>