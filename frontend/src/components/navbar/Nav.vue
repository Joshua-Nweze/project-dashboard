<template>
    <div>
        <nav class="navbar navbar-expand-lg">
            <div class="container-fluid">
                <button  class="navbar-toggler" type="button" aria-expanded="false" aria-label="Toggle navigation" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
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

        <CollapsibleNav />

    </div>
</template>

<script setup>
    // let showCollapsible = ref(false)

    // function closeCollapsible() {
    //     showCollapsible.value = false
    // }
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