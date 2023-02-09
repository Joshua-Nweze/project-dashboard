<template>
    <div class="mt-3">
        See files by <span>categories</span> or <span>individual files</span>
        
        <div class="row d-flex justify-content-center mt-3">
            <router-link :to="`/files/${category.split(' ').join('-')}`" class="col-3 mb-2 link" v-for="category in catArr" :key="category.index">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">{{ category }}</h5>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script setup>
    import { useFiles } from "@/store/useFiles"
    import { reactive, ref } from "@vue/reactivity";
    import { storeToRefs } from "pinia";

    let files = useFiles()
    let {file, catArr} = storeToRefs(files)
    let fileDetails = file.value.files
    let {getCat} = files
    
    getCat()

</script>

<style scoped>
    .link{
        text-decoration: none;
        color: black;
    }
</style>