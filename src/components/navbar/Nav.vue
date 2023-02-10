<template>
    <div>
        <CollapsibleNav 
            class="d-md-block d-lg-none d-xl-none" 
            v-if="showCollapsible" 
            @closeCollapsible="closeCollapsible"
        />

        <nav class="navbar navbar-expand-lg">
            <div class="container-fluid">
                <button @click="showCollapsible = true" class="navbar-toggler" type="button" data-bs-toggle="collapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <a class="navbar-brand"><h1>ESHDC <span class="text-body-secondary">Data Dashboard</span></h1></a>

                <div class="d-none d-lg-block justify-content-end nav-links">

                    <router-link to="/notifications" class="router-link">
                        <span class="position-relative">
                            <i class="bi bi-bell"></i> 
                            Notifications
                            <!-- <span class="notification-dot position-absolute top-0 start-90 translate-middle p-2 bg-danger border border-light rounded-circle">
                            <span class="visually-hidden">New notifications</span>
                            </span> -->
                        </span>
                    </router-link>

                    <router-link to="/account" class="router-link">
                        <span><i class="bi bi-person-circle"></i> Account</span>
                    </router-link>

                    <router-link to="/" class="router-link">
                        <span class=""><i class="bi bi-box-arrow-left"></i> Logout</span>
                    </router-link>
                </div>
            </div>
        </nav>

    </div>
</template>

<script setup>
    import { useRoute, useRouter } from "vue-router";
    import { useFiles } from "@/store/useFiles"
    import { reactive, ref } from "@vue/reactivity";
    import { storeToRefs } from "pinia";

    
  import CollapsibleNav from "@/components/navbar/CollapsibleNav"

    let files = useFiles()
    let {searchFile} = files

    let searchVal = ref()

    let router = useRouter()
    let showCollapsible = ref(false)

    function search(searchVal) {
        if (searchVal.value !== "") {
            router.push({ name: 'search', params: { query: searchVal.value.split(' ').join('-')}})
            searchFile(searchVal.value)
            searchVal.value = ''
        }
    }

    function closeCollapsible() {
        showCollapsible.value = false
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