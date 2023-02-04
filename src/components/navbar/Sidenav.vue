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
                <div class="row">
                    <div class="col-12 sidebar-items active">
                        <span class="col-3"><i class="bi bi-table"></i></span>
                        <span class="col-9 align-items-center">Dashboard</span>
                    </div>
                     <div class="col-12 sidebar-items">
                        <span class="col-3"><i class="bi bi-bell"></i></span>
                        <span class="col-9 align-items-center">Notification</span>
                    </div>
                     <div class="col-12 sidebar-items">
                        <span class="col-3"><i class="bi bi-file-earmark"></i></span>
                        <span class="col-9 align-items-center">Files</span>
                    </div>
                     <div class="col-12 sidebar-items">
                        <span class="col-3"><i class="bi bi-upload"></i></span>
                        <span class="col-9 align-items-center">File Upload</span>
                    </div>
                     <div class="col-12 sidebar-items">
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

</script>

<style scoped>
    .side-nav{
        height: 100vh;
        background-color: black;
        margin: 0;
        color: white;
    }

    .logo{
        height: 30px;
        width: 30px;
    }

    .sidebar-items{
        margin-bottom: 15px;
        /* padding-bottom: 15px; */
        height: 45px;
        display: flex;
        align-items: center;
    }

    .active{
        background-color: #2e2e2e;
        border-radius: 5px;
    }
</style>