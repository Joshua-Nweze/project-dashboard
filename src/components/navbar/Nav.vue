<template>
    <div>
        <nav class="navbar">
            <div class="container-fluid">
                <a class="navbar-brand"><h1>ESHDC <span class="text-body-secondary">Data Dashboard</span></h1></a>

                <div class="d-flex justify-content-end nav-links">
                <!-- <span class="hover-pointer" data-bs-toggle="modal" data-bs-target="#searchModal"><i class="bi bi-search"></i> Search</span> -->

                <router-link to="/notifications" class="router-link">
                    <span class="position-relative">
                        <i class="bi bi-bell"></i> 
                        Notifications
                        <span class="notification-dot position-absolute top-0 start-90 translate-middle p-2 bg-danger border border-light rounded-circl d-none">
                        <span class="visually-hidden">New notifications</span>
                        </span>
                    </span>
                </router-link>

                <router-link to="/account" class="router-link">
                    <span><i class="bi bi-person-circle"></i> Account</span>
                </router-link>

                <span class="hover-pointer">Logout</span>
                </div>
            </div>
        </nav>


        <!-- Search Modal -->
        <!-- <div class="modal fade" id="searchModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="searchInput" class="form-label">Search file</label>
                        <div class="row">
                            <div class="col-9">
                                <input type="email" class="form-control" id="searchInput" placeholder="Search file" @keypress.enter="search" v-model="searchVal">
                            </div>
                            <div class="col-3">
                                <button type="button" class="btn btn-outline-secondary" @click="search" data-bs-dismiss="modal">Search</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div> -->

    </div>
</template>

<script setup>
    import { useRoute, useRouter } from "vue-router";
    import { useFiles } from "@/store/useFiles"
    import { reactive, ref } from "@vue/reactivity";
    import { storeToRefs } from "pinia";

    let files = useFiles()
    let {searchFile} = files

    let searchVal = ref()

    let router = useRouter()

    function search(searchVal) {
        if (searchVal.value !== "") {
            router.push({ name: 'search', params: { query: searchVal.value.split(' ').join('-')}})
            searchFile(searchVal.value)
            searchVal.value = ''
        }
    }
</script>

<style scoped>
    h1{
        font-size: 20px;
    }

    .navbar{
        margin: 0;
        background-color: var(--bs-gray-300);
    }

    .nav-links > .router-link{
        padding: 0 5px;
    }

    .notification-dot{  
        overflow-x: visible;
    }

    .p-2{
        padding: 0.2rem!important;
    }

    .router-link{
        text-decoration: none;
        color: #212529;
    }

    .form-control:focus{
        border-color: #6c757d;
        box-shadow: none;
    }

    .hover-pointer:hover{
        cursor: pointer;
    }
</style>