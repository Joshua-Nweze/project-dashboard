<template>
    <div>
        <div class="side-nav">
            <div class="row d-flex justify-content-center pt-4">
                <div class="col-9 sidenav-brand">
                    <div class="row">
                        <span class="col-3"><img src="../../assets/imgs/logo.png" alt="logo" class="logo rounded-circle"></span>
                        <span class="col-9 align-items-center">ESHDC</span>
                    </div>
                    <hr>
                    <div class="row" v-if="dataReady">
                        <router-link to="/dashboard" class="col-12 sidebar-items">
                            <span class="col-3"><i class="bi bi-house"></i></span>
                            <span class="col-9 align-items-center">Dashboard</span>
                        </router-link>

                        <router-link to="/add-project" class="col-12 sidebar-items" @click="collapsibleClicked" v-if="!isAdmin">
                            <span class="col-3"><i class="bi bi-plus"></i></span>
                            <span class="col-9 align-items-center">Add project</span>
                        </router-link>

                        <router-link to="/projects" class="col-12 sidebar-items" @click="collapsibleClicked">
                            <span class="col-3"><i class="bi bi-cone"></i></span>
                            <span class="col-9 align-items-center">Projects</span>
                        </router-link>

                        <router-link to="/staff" class="col-12 sidebar-items" v-if="isAdmin">
                            <span class="col-3"><i class="bi bi-people"></i></span>
                            <span class="col-9 align-items-center">Staff</span>
                        </router-link>

                        <router-link to="/account" class="col-12 sidebar-items">
                            <span class="col-3"><i class="bi bi-person-circle"></i></span>
                            <span class="col-9 align-items-center">Account</span>
                        </router-link>
                    </div>
                    </div>
                </div>
            </div>
    </div>
</template>

<script setup>
import { useUser } from '@/store/useUser';
import { storeToRefs } from 'pinia';
import { inject, ref } from 'vue';

let userStore = useUser()
const userEmail = inject('userEmail')

let { user } = storeToRefs(userStore)

let isAdmin = ref(false)

let dataReady = ref(false)
async function getDataOnLoad() {
    if (!user.value ) {
        await userStore.getUserDetails(userEmail)
    }

    user.value.userType == 'admin' ? isAdmin.value = true : isAdmin.value = false
    dataReady.value = true
}
getDataOnLoad()
</script>

<style scoped>
.side-nav{
    height: 100vh;
    background-color: black;
    margin: 0;
    color: white;
    width: inherit;
    position: fixed;
    overflow-y: scroll;
    padding-bottom: 100px;
    overflow-x: hidden;
    z-index: 2;

    /* Hide scrollbar for IE, Edge add Firefox */
    -ms-overflow-style: none;
    scrollbar-width: none; /* Firefox */
}
/* Hide scrollbar for Chrome, Safari and Opera */
.side-nav::-webkit-scrollbar {
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

.active, .sidebar-section:hover{
    background-color: #2e2e2e;
    border-radius: 5px;
}   
</style>