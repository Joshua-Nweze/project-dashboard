<template>
    <div>
        <nav class="navbar navbar-expand-lg">
            <div class="container-fluid">
                <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample"
                    aria-controls="offcanvasExample">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <a class="navbar-brand">
                    <h1><span class="text-body-secondary">Project Dashboard</span></h1>
                </a>

                <div class="d-none d-lg-flex gap-3 justify-content-end nav-links ">

                    <router-link to="/account" class="router-link">
                        <span><i class="bi bi-person-circle fs-4"></i></span>
                    </router-link>

                    <span class="me-3 logout" data-bs-toggle="modal" data-bs-target="#logoutModal">
                        <span class=""><i class="bi bi-box-arrow-left fs-4"></i></span>
                    </span>
                </div>
            </div>
        </nav>

        <!-- Collapsible -->
        <div v-if="dataReady" class="side-nav offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample"
            aria-labelledby="offcanvasExampleLabel">
            <div class="row d-flex justify-content-center pt-4 side-nav-items">
                <div class="col-9 sidenav-brand d-flex flex-column" style="height: 90vh">
                    <div class="offcanvas-header p-1">
                        <div class="offcanvas-title d-flex align-items-center gap-3" id="offcanvasExampleLabel">
                            <span class="align-items-center text-secondary">
                                <div class="d-flex align-items-center">
                                    <div><i class="bi bi-person-circle"></i></div>
                                    <div v-if="user" class="text-break mx-2">{{ user.userType == 'staff' ? user.name : user.email }}</div>
                                </div>
                            </span>
                        </div>
                        <span data-bs-dismiss="offcanvas" aria-label="Close"><i class="bi bi-x-circle"></i></span>
                    </div>
                    <hr>
                    <div class="row items">
                        <div class="col-12 sidebar-items" @click="goTo('/dashboard')" data-bs-dismiss="offcanvas"
                            aria-label="Close">
                            <span class="col-3"><i class="bi bi-house"></i></span>
                            <span class="col-9 align-items-center">Dashboard</span>
                        </div>

                        <div v-if="!isAdmin" class="col-12 sidebar-items" @click="goTo('/add-project')"
                            data-bs-dismiss="offcanvas" aria-label="Close">
                            <span class="col-3"><i class="bi bi-plus"></i></span>
                            <span class="col-9 align-items-center">Add project</span>
                        </div>

                        <div class="col-12 sidebar-items" @click="goTo('/projects')" data-bs-dismiss="offcanvas"
                            aria-label="Close">
                            <span class="col-3"><i class="bi bi-cone"></i></span>
                            <span class="col-9 align-items-center">Projects</span>
                        </div>

                        <div v-if="isAdmin" class="col-12 sidebar-items" @click="goTo('/staff')" data-bs-dismiss="offcanvas"
                            aria-label="Close">
                            <span class="col-3"><i class="bi bi-people"></i></span>
                            <span class="col-9 align-items-center">Staff</span>
                        </div>

                        <div class="col-12 sidebar-items" @click="goTo('/account')" data-bs-dismiss="offcanvas"
                            aria-label="Close">
                            <span class="col-3"><i class="bi bi-person-circle"></i></span>
                            <span class="col-9 align-items-center">Account</span>
                        </div>
                    </div>

                    <div class="row mt-auto">
                        <div class="col-12 btn btn-outline-light" @click="logout">
                            Logout
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Logout Modal -->
        <div class="modal fade" id="logoutModal" tabindex="-1" aria-labelledby="logoutModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Are you sure you want to logout?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary"  @click="logout" data-bs-dismiss="modal">Logout</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useUser } from '@/store/useUser';
import { storeToRefs } from 'pinia';
import { inject, ref } from 'vue';
import Cookies from 'js-cookie'

let userStore = useUser()
const userEmail = inject('userEmail')
const apihost = inject('apihost')

let { user } = storeToRefs(userStore)

let isAdmin = ref(false)

let router = useRouter()

function goTo(route) {
    router.push({ path: route })
}

let dataReady = ref(false)
async function getDataOnLoad() {
    if (!user.value) {
        await userStore.getUserDetails(userEmail)
    }

    user.value.userType == 'admin' ? isAdmin.value = true : isAdmin.value = false
    dataReady.value = true
}
getDataOnLoad()

async function logout() {
    let req = await fetch(`${apihost}/api/auth/logout`, { credentials: 'include' })

    if (req.status == 200) {
        Cookies.remove('token')
        window.location.href = window.location.href  // refresh 
    }
}

</script>

<style scoped>
h1 {
    font-size: 20px;
}

.navbar {
    margin: 0;
    background-color: var(--bs-gray-300);
}

.nav-links>.router-link {
    padding: 0 5px;
}

.p-2 {
    padding: 0.2rem !important;
}

.router-link {
    text-decoration: none;
    color: #212529;
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
    .side-nav-items {
        width: 65vw;
    }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
    .side-nav-items {
        width: 40vw;
    }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
    .side-nav-items {
        width: 40vw;
    }
}

.side-nav-items {
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
    scrollbar-width: none;
    /* Firefox */
}

/* background-color: rgba(100, 100, 100, .7); */
/* Hide scrollbar for Chrome, Safari and Opera */
.side-nav-items::-webkit-scrollbar {
    display: none;
}

.logo {
    height: 30px;
    width: 30px;
}

.sidebar-items {
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

.logout {
    transform: rotate(180deg);
}
.logout:hover {
    cursor: pointer;
}</style>