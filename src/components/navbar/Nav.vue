<template>
    <div>
        <nav class="navbar">
            <div class="container-fluid">
                <a class="navbar-brand"><b>ESHDC</b> Dashboard</a>

                <div class="d-flex justify-content-end nav-links">
                <span><i class="bi bi-search"></i> Search</span>
                <span class="position-relative">
                    <i class="bi bi-bell"></i> 
                    Notification
                    <span class="notification-dot position-absolute top-0 start-90 translate-middle p-2 bg-danger border border-light rounded-circle">
                    <span class="visually-hidden">New notifications</span>
                    </span>
                </span>
                <span><i class="bi bi-person-circle"></i> Account</span>
                <span>Logout</span>
                </div>
            </div>
        </nav>
    </div>
</template>

<script setup>

</script>

<style scoped>
    .navbar{
        margin: 0;
        background-color: var(--bs-gray-300);
    }

    .nav-links > span{
        padding: 0 5px;
    }

    .notification-dot{  
        overflow-x: visible;
    }
    .p-2{
        padding: 0.2rem!important;
    }
</style>