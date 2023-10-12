<template>
    <div>
        <div class="side-nav">
        <div class="row d-flex justify-content-center pt-4">
            <div class="col-9 sidenav-brand">
                <div class="row">
                    <span class="col-2"><img src="../../assets/imgs/logo.png" alt="logo" class="logo rounded-circle"></span>
                    <span class="col-8 align-items-center">ESHDC</span>
                    <span class="col-2" @click="collapsibleClicked"><i class="bi bi-x-circle"></i></span>
                </div>
                <hr>
                <div class="row">
                    <router-link to="/dashboard" class="col-12 sidebar-items" @click="collapsibleClicked">
                        <span class="col-3"><i class="bi bi-table"></i></span>
                        <span class="col-9 align-items-center">Dashboard</span>
                    </router-link>
                    
                    <router-link to="/notifications" class="sidebar-items" @click="collapsibleClicked">
                        <span class="col-3"><i class="bi bi-bell"></i></span>
                        <span class="col-9 align-items-center">Notifications</span>
                    </router-link>
                    
                    <router-link to="/files" class="col-12 sidebar-items" @click="collapsibleClicked">
                        <span class="col-3"><i class="bi bi-cone"></i></span>
                        <span class="col-9 align-items-center">Projects</span>
                    </router-link>

                    <router-link to="/staff" class="col-12 sidebar-items" @click="collapsibleClicked">
                        <span class="col-3"><i class="bi bi-persons"></i></span>
                        <span class="col-9 align-items-center">Staff</span>
                    </router-link>

                    <router-link to="/account" class="col-12 sidebar-items" @click="collapsibleClicked">
                        <span class="col-3"><i class="bi bi-person-circle"></i></span>
                        <span class="col-9 align-items-center">Account</span>
                    </router-link>

                    <hr>

                    <router-link to="/" class="col-6 justify-content-center sidebar-items" @click="collapsibleClicked">
                        <!-- <span class="col-3"><i class="bi bi-person-circle"></i></span> -->
                        <btn class="btn btn-outline-light align-items-center text-light">Logout</btn>
                    </router-link>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script setup>
    let emit = defineEmits(['closeCollapsible'])

    function collapsibleClicked (){
        emit('closeCollapsible')
    }
</script>

<style scoped>
    .side-nav{
        height: 100vh;
        background-color: black;
        margin: 0;
        color: white;
        width: 85vw;
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