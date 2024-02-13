<template>
    <div class="row justify-content-center">
        <div class="col-lg-6 col-xl-4 col-md-8 col-sm-10">
            <div class="card border-0">
                <div class="card-body">
                    
                    <Header title="Create new password" />
                    
                    <div v-if="feedback" class="alert alert-dismissible fade show" role="alert" :class="[ status == 200 || status == 201 ? 'alert-success' : 'alert-danger' ]">
                        {{ feedback }}.
                        <div v-if="status == 201" class="fw-bold mt-3">
                            Taking you to login page in {{ countdown }}
                        </div>
                        <button @click="feedback = null" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>

                    <div class="input-group mb-3">
                        <span class="input-group-text"><i class="bi bi-lock"></i></span>
                        <input
                         type="password" 
                         @keypress.enter="resetPwd" 
                         class="form-control" 
                         placeholder="Enter new password"
                         v-model="newPassword"
                        >
                    </div>

                    <div class="input-group mb-3">
                        <span class="input-group-text"><i class="bi bi-lock"></i></span>
                        <input
                         type="password" 
                         @keypress.enter="resetPwd" 
                         class="form-control" 
                         placeholder="Re-enter new password"
                         v-model="reNewPassword"
                        >
                    </div>

                    <div class="d-flex justify-content-end">
                            <button class="btn btn-secondary" @click="resetPwd">
                                <div v-if="!loading">
                                    Continue
                                </div>

                                <SmallLoadingSpinner v-else />
                            </button>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Header from '@/components/auth/Header.vue';
import SmallLoadingSpinner from '@/components/SmallLoadingSpinner.vue';
import { inject, ref } from 'vue';
import { useRoute } from 'vue-router';
import { decrypt } from '../composables/enc'
import router from '@/router';

let route = useRoute()

const apihost = inject('apihost')

let newPassword = ref('')
let reNewPassword = ref('')

let feedback = ref(null)
let status = ref(null)
let loading = ref(false)

let email = ref(route.query.q)
let otp = ref(route.query.r)

let countdown = ref(3)

if (!route.query.q || !route.query.r) {
    router.push('/forgot-password-otp')
}

if (!email.value || !otp.value) {
    router.push('/')
}

email.value =  decrypt(email.value)
otp.value = decrypt(otp.value)

async function resetPwd() {
    feedback.value = status.value = null

    if (!email.value || !otp.value) {
        feedback.value = 'Something went wrong, looks like your link is broken. Try starting the password reset process again'
        return
    }

    if (!newPassword.value || !reNewPassword.value) {
        feedback.value = 'All inputs are required'
        reNewPassword.value = ''
        return
    }
    if (newPassword.value.length < 6) {
        feedback.value = 'Password length must be greater than 6'
        reNewPassword.value = ''
        return
    }
    if (newPassword.value != reNewPassword.value) {
        feedback.value = 'Passwords do not match'
        reNewPassword.value = ''
        return
    }

    loading.value = true

    let req = await fetch(`${apihost}/api/auth/reset-password`, {
        method: "PATCH",
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
            email: email.value,
            otp: otp.value,
            password: newPassword.value,
            password_confirm: reNewPassword.value
        })
    })

    let res = await req.json()

    feedback.value = res.message
    status.value = req.status
    loading.value = false

    if (req.status == 201) {
        newPassword.value = reNewPassword.value = ''
        setInterval(() => {
            countdown.value --

            if (countdown.value == 0) {
                router.push('/')
            }
        }, 1000)
    }
}
</script>

<style scoped>
.row {
    margin-top: 80px;
}
</style>