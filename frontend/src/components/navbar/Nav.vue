<template>
    <div>
        <nav class="navbar navbar-expand-lg">
            <div class="container-fluid">
                <button  class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <a class="navbar-brand"><h1>ESHDC <span class="text-body-secondary">Data Dashboard</span></h1></a>

                <div class="d-none d-lg-block justify-content-end nav-links">

                    <router-link to="/notifications" class="router-link">
                        <span class="position-relative">
                            <i class="bi bi-bell"></i>
                        </span>
                    </router-link>

                    <router-link to="/account" class="router-link">
                        <span><i class="bi bi-person-circle"></i></span>
                    </router-link>

                    <router-link to="/" class="router-link">
                        <span class=""><i class="bi bi-box-arrow-left"></i></span>
                    </router-link>
                </div>
            </div>
        </nav>

        <!-- Collapsible -->
        <div class="side-nav offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
            <div class="row d-flex justify-content-center pt-4 side-nav-items">
                <div class="col-9 sidenav-brand">
                    <div class="offcanvas-header p-1" >
                        <div class="offcanvas-title d-flex align-items-center gap-3" id="offcanvasExampleLabel">
                            <span><img src="../../assets/imgs/logo.png" alt="logo" class="logo rounded-circle"></span>
                            <span class="align-items-center">ESHDC</span>
                        </div>
                        <span data-bs-dismiss="offcanvas" aria-label="Close"><i class="bi bi-x-circle"></i></span>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-12 sidebar-items" @click="goTo('/dashboard')"  data-bs-dismiss="offcanvas" aria-label="Close">
                            <span class="col-3"><i class="bi bi-house"></i></span>
                            <span class="col-9 align-items-center">Dashboard</span>
                        </div>
                        
                        <div class="sidebar-items" @click="goTo('/notifications')" data-bs-dismiss="offcanvas" aria-label="Close">
                            <span class="col-3"><i class="bi bi-bell"></i></span>
                            <span class="col-9 align-items-center">Notifications</span>
                        </div>

                        <div class="col-12 sidebar-items" @click="goTo('/add-project')" data-bs-dismiss="offcanvas" aria-label="Close">
                            <span class="col-3"><i class="bi bi-plus"></i></span>
                            <span class="col-9 align-items-center">Add project</span>
                        </div>

                        <div class="col-12 sidebar-items"  @click="goTo('/projects')" data-bs-dismiss="offcanvas" aria-label="Close">
                            <span class="col-3"><i class="bi bi-cone"></i></span>
                            <span class="col-9 align-items-center">Projects</span>
                        </div>

                        <div class="col-12 sidebar-items" @click="goTo('/staff')" data-bs-dismiss="offcanvas" aria-label="Close">
                            <span class="col-3"><i class="bi bi-people"></i></span>
                            <span class="col-9 align-items-center">Staff</span>
                        </div>

                        <div class="col-12 sidebar-items" @click="goTo('/account')" data-bs-dismiss="offcanvas" aria-label="Close">
                            <span class="col-3"><i class="bi bi-person-circle"></i></span>
                            <span class="col-9 align-items-center">Account</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

let router = useRouter()

function goTo(route) {
    router.push({ path: route })
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

.p-2{
    padding: 0.2rem!important;
}

.router-link{
    text-decoration: none;
    color: #212529;
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
    .side-nav-items{
        width: 65vw;
    }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
    .side-nav-items{
        width: 40vw;
    }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
    .side-nav-items{
        width: 40vw;
    }
}

.side-nav-items{
    height: 100vh;
    background-color: black;
    margin: 0;
    color: white;
    position: fixed;
    overflow-y: scroll;
    padding-bottom: 100px;
    overflow-x: hidden;
    z-index: 99;

    /* Hide scrollbar for IE, Edge add Firefox */
    -ms-overflow-style: none;
    scrollbar-width: none; /* Firefox */
}

/* background-color: rgba(100, 100, 100, .7); */
/* Hide scrollbar for Chrome, Safari and Opera */
.side-nav-items::-webkit-scrollbar {
    display: none;
}

.logo{
    height: 30px;
    width: 30px;
}

.sidebar-items{
    /* padding-bottom: 15px; */
    margin: 7px 0;
    width: 100%;
    height: 45px;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: white;
}

.offcanvas {
    background: none;
    bottom: auto;
}
</style>