<template>
    <div class="row align-items-center">
        <div class="col-3 fs-2">Files</div>

        <div class="col-6">
            <div class="row">
                <div class="col-9">
                    <input type="email" class="form-control" id="searchInput" placeholder="Search files" v-model="searchVal" @keypress.enter="search">
                </div>
                <div class="col-3">
                    <button type="button" class="btn btn-outline-secondary" @click="search">Search</button>
                </div>
            </div>
        </div>

        <div class="col-3 d-flex justify-content-end dropdown">
            <div class="dropdown-toggle hover-pointer" data-bs-toggle="dropdown" aria-expanded="false"><i class="bi bi-filter"></i> Sort</div>

            <ul class="dropdown-menu justify-content-end">
                <!-- <li><a class="dropdown-item" href="#">Recently added</a></li> -->
                <li><a class="dropdown-item" href="#" @click="sortCatArrAsc">A - Z</a></li>
                <li><a class="dropdown-item" href="#" @click="sortCatArrDsc">Z - A</a></li>
            </ul>
        </div>
    </div>
</template>

<script setup>
    import { useRoute, useRouter } from "vue-router";
    import { useFiles } from "@/store/useFiles"
    import { reactive, ref } from "@vue/reactivity";
    import { storeToRefs } from "pinia";

    let files = useFiles()
    let {queryFiles} = storeToRefs(files)
    let {searchFile, sortCatArrAsc, sortCatArrDsc} = files

    let searchVal = ref()

    let router = useRouter()

    // function sortAs(){
    //     console.log(1);
    //     // sortAsc(queryFiles)
    //     console.log(queryFiles)
    // }

    function search() {
        if (searchVal.value !== "") {
            router.push({ name: 'search', params: { query: searchVal.value.split(' ').join('-')}})
            searchFile(searchVal.value)
            searchVal.value = ''
        }
    }
</script>

<style scoped>
    .form-control:focus{
        border-color: #6c757d;
        box-shadow: none;
    }

    .hover-pointer:hover{
        cursor: pointer;
    }
</style>