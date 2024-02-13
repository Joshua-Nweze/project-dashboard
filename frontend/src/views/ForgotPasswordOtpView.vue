<template>
    <div class="row justify-content-center">
        <div class="col-lg-6 col-xl-4 col-md-8 col-sm-10">
            <div class="card border-0">
                <div class="card-body">
                    
                    <Header title="Enter OTP sent to your email" />
                    <span>We sent an OTP to {{ email }}</span>
                    
                    <div v-if="feedback" class="mt-4">
                        <div
                         class="alert alert-dismissible fade show"
                         :class="{'alert-success': status == 200 || status == 201, 'alert-danger': status != 200  }"
                         role="alert">
                            {{ feedback }}
                            <button type="button" class="btn-close" @click="feedback = status = null"></button>
                        </div>
                    </div>

                    <div class="my-3">
                        <input
                         type="text" 
                         @keypress.enter="validateOtp" 
                         class="form-control" 
                         placeholder="****"
                         v-model="otp">
                    </div>

                    <div class="resend-otp my-4">
                        <div v-if="!showResendOtpLink">
                            Resend code in  {{ resendOtpTimer }}
                        </div>
                        <div v-else class="resend-otp-link" @click="resendOtp">
                            Resend code
                        </div>
                    </div>

                    <div class="d-flex justify-content-end">
                            <button class="btn btn-secondary" @click="validateOtp">
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
import { inject, ref } from 'vue';
import Header from '@/components/auth/Header.vue';
import SmallLoadingSpinner from '@/components/SmallLoadingSpinner.vue';
import router from '@/router';
import { decrypt, encrypt } from '../composables/enc'
import { useRoute } from 'vue-router';

let route = useRoute()

let loading = ref(false)

let feedback = ref(null)
let status = ref(null)

const apihost = inject('apihost')

let email = ref(route.query.q)

email.value = decrypt(email.value)

// send the user back to forgot-password page if
// there's not 'q' query in route or it's invalid
if (!route.query.q) {
    router.push('/forgot-password')
}


if (!email.value) {
    feedback.value = 'Something went wrong, looks like your link is broken. Try starting the password reset process again'
}

let resendOtpTimer = ref(59)
let showResendOtpLink = ref(false)

setInterval(() => { 
    resendOtpTimer.value --

    if (resendOtpTimer.value < 0) {
        showResendOtpLink.value = true
    }
}, 1000)


let otp = ref(null)

// function handleOnComplete(value) {
//     otp.value = value
// }

async function resendOtp() {
    if (!email.value) {
        feedback.value = 'Something went wrong, looks like your link is broken. Try starting the password reset process again'
        return
    }

    let req = await fetch(`${apihost}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ email: email.value })
    })
}

async function validateOtp() {
    feedback.value = status.value = null

    if (!email.value || !otp.value) {
        feedback.value = 'Something went wrong, looks like your link is broken. Try starting the password reset process again'
        return
    }
    
    loading.value = true

    let req = await fetch(`${apihost}/api/auth/validate-opt`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
            email: email.value,
            otp: otp.value
        })
    })

    let res = await req.json()

    if (req.status == 200) {
        let encEmail = encrypt(email.value)
        let encOtp = encrypt(otp.value)

        router.push(`/reset-password?q=${encEmail}&r=${encOtp}`)
    }

    status.value = req.status
    feedback.value = res.message
    loading.value = false
}
</script>

<style scoped>
.row {
    margin-top: 80px;
}

input.otp-input {
  width: 40px;
  height: 40px;
  padding: 5px;
  margin: 0 10px;
  font-size: 20px;
  border-radius: 4px;
  border: 1px solid #4f46e5;
  background-color: aquamarine;
  text-align: center;
}

.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.resend-otp {
    font-size: 12px;
}

.resend-otp-link{
    color: blue;
    text-decoration: underline;
}
</style>