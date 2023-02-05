<template>
    <div>
        <nav class="navbar">
            <div class="container-fluid">
                <a class="navbar-brand"><h1>ESHDC <span class="text-body-secondary">Data Dashboard</span></h1></a>

                <div class="d-flex justify-content-end nav-links">
                <span><i class="bi bi-search"></i> Search</span>

                <router-link to="/notifications" class="router-link">
                    <span class="position-relative">
                        <i class="bi bi-bell"></i> 
                        Notifications
                        <span class="notification-dot position-absolute top-0 start-90 translate-middle p-2 bg-danger border border-light rounded-circle">
                        <span class="visually-hidden">New notifications</span>
                        </span>
                    </span>
                </router-link>

                <router-link to="/account" class="router-link">
                    <span><i class="bi bi-person-circle"></i> Account</span>
                </router-link>
                <span>Logout</span>
                </div>
            </div>
        </nav>
    </div>
</template>

<script setup>

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
</style>