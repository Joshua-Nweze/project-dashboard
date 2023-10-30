<template>
    <div class="row justify-content-center">
        <div class="col-lg-6 col-xl-4 col-md-8 col-sm-10">
            <div class="card">
                <div class="card-body">

                    <Header title="Enter your details" />

                    <div v-if="showErrMsg">
                        <div class="alert alert-danger alert-dismissible fade show" role="alert">
                            Incorrect username or password
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" @click="closeShowErrMsg"></button>
                        </div>
                    </div>

                    <div v-if="showSuccess">
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            Logged in successful
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" @click="closeShowErrMsg"></button>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <input type="text" @keypress.enter="login" class="form-control" placeholder="Full Name" aria-label="E-mail" aria-describedby="basic-addon1" v-model="email">
                    </div>
                    <div class="input-group mb-3">
                        <input type="text" @keypress.enter="login" class="form-control" placeholder="LGA" aria-label="E-mail" aria-describedby="basic-addon1" v-model="email">
                    </div>
                    <div class="input-group mb-3">
                        <input type="tel" @keypress.enter="login" class="form-control" placeholder="Phone" aria-label="E-mail" aria-describedby="basic-addon1" v-model="email">
                    </div>

                    <div class="d-flex justify-content-end">
                        <!-- <router-link to="/dashboard"> -->
                            <button class="btn btn-secondary" @click="login">Create account</button>
                        <!-- </router-link> -->
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Header from '@/components/auth/Header.vue';
</script>

<style scoped>
    *{
        overflow-x: hidden;
    }

    .row{
        /* Hide scrollbar for IE, Edge add Firefox */
        -ms-overflow-style: none;
        scrollbar-width: none; /* Firefox */

        --bs-gutter-x: 0;
        --bs-gutter-y: 0
    }
    .row::-webkit-scrollbar {
        display: none;
    }

    .forgot-pwd{
        font-size: 12px;
    }

    .form-control:focus{
        border-color: #6c757d;
        box-shadow: none;
    }

    .row{
        margin-top: 80px;
    }
</style>