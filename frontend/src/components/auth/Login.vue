<template>
    <div class="row justify-content-center">
        <div class="col-lg-6 col-xl-4 col-md-8 col-sm-10">
            <div class="card border-0">
                <div class="card-body">
                    
                    <Header title="Login to cotinue" />
                    
                    <div v-if="feedback">
                        <div
                         class="alert alert-dismissible fade show"
                         :class="{'alert-success': status == 200 || status == 201, 'alert-danger': status != 200  }"
                         role="alert">
                            {{ feedback }}
                            <button type="button" class="btn-close" @click="clearFeedbackAndStatus"></button>
                        </div>
                    </div>

                    <div class="input-group mb-3">
                        <span class="input-group-text">@</span>
                        <input
                         type="email" 
                         @keypress.enter="login" 
                         class="form-control" 
                         placeholder="E-mail" 
                         aria-label="E-mail"
                         v-model="email">
                    </div>

                    <div class="input-group mb-3">
                        <span class="input-group-text"><i class="bi bi-lock"></i></span>
                        <input
                         type="password" 
                         @keypress.enter="login" 
                         class="form-control" 
                         placeholder="Password" 
                         aria-label="Password"
                         v-model="password">
                    </div>

                    <RouterLink to="/forgot-password" class="link-sm">
                        Forgot password
                    </RouterLink>

                    <div class="d-flex justify-content-end">
                            <button class="btn btn-secondary" :class="{'disable-click': loading}" @click="login">
                                <div v-if="!loading">
                                    Login
                                </div>

                                <SmallLoadingSpinner v-else />
                            </button>
                    </div>

                    <div class="link-sm text-center mt-5">
                        Have you been invited to be a staff?
                        <RouterLink to="/setup/identify">
                            Setup account
                        </RouterLink>
                    </div>
                    
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { inject, ref } from 'vue';
import { useRouter } from 'vue-router';
import { provide } from 'vue';
import SmallLoadingSpinner from '../SmallLoadingSpinner.vue';
import Header from "./Header.vue";

import Cookies from 'js-cookie'

let router = useRouter()

let email = ref('')
let password = ref('')

let apihost = inject('apihost')

let feedback = ref(null)
let status = ref(null)
let loading = ref(false)

async function login() {
    feedback.value = null
    status.value = null

    if (!email.value || !password.value) {
        status.value = 400
        feedback.value = 'All inputs are required'
        return
    }

    loading.value = true

    if (!navigator.onLine) {
        feedback.value = 'Looks like you don\'t have an active internet connection'
        loading.value = false
        return
    }

    let req = await fetch(`${apihost}/api/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
            email: email.value,
            password: password.value
        })
    })

    let res = await req.json()

    console.log('res', res)
        if(req.status == 200) {
        Cookies.set('token', res.token, { expires: 2, httpOnly: true })
        provide('userEmail', email.value)
        router.push('/dashboard')
    } else {
        password.value = ''
    }

    feedback.value = res.message
    status.value = req.status
    loading.value = false
}

function clearFeedbackAndStatus () {
    feedback.value = null;
    status.value = null;
}
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

    .link-sm{
        font-size: 12px;
    }

    .form-control:focus{
        border-color: #6c757d;
        box-shadow: none;
    }

    .row{
        margin-top: 80px;
    }

    .disable-click{
        opacity: 0.6;
        pointer-events: none;
    }
    .disable-click:hover{
        cursor: not-allowed;
    }
</style>