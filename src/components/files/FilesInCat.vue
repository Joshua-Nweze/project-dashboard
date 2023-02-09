<template>
    <div class="row">
        <div class="fs-2 col-9">{{ queryFiles[0].category }}</div>
        <div class="col-3 d-flex justify-content-end dropdown">
            <div class="dropdown-toggle hover-pointer" data-bs-toggle="dropdown" aria-expanded="false"><i class="bi bi-filter"></i> Sort</div>

            <ul class="dropdown-menu justify-content-end">
                <!-- <li><a class="dropdown-item" href="#">Recently added</a></li> -->
                <li><a class="dropdown-item" href="#" @click="sortqFilesAsc">A - Z</a></li>
                <li><a class="dropdown-item" href="#" >Z - A</a></li>
            </ul>
        </div>
    </div>

    <div class="row d-flex justify-content-center mt-3">
        <div class="col-3 mb-2" v-for="queryFile in queryFiles" :key="queryFile.index">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">{{ queryFile.title }}</h5>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { useRoute } from "vue-router";
    import { useFiles } from "@/store/useFiles"
    import { reactive, ref } from "@vue/reactivity";
    import { storeToRefs } from "pinia";

    import { routeEdit } from '@/composables/routeEdit'

    let files = useFiles()
    let {file, queryFiles} = storeToRefs(files)
    let {getFileFromRoute, sortqFilesAsc} = files
    console.log(queryFiles);


    let { routeRemoveDash } = routeEdit()

    let route = useRoute()

    let fileCat = ref(route.params.filesInCat);
    getFileFromRoute(routeRemoveDash(fileCat))
</script>

<style scoped>
    .dropdown-toggle::after{
        display: none;
    }
</style>