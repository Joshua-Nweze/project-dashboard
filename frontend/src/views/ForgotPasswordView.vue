<template>
    <div class="row justify-content-center">
        <div class="col-lg-6 col-xl-4 col-md-8 col-sm-10">
            <div class="card border-0">
                <div class="card-body">
                    
                    <Header title="Forgot password" />
                    
                    <div v-if="feedback">
                        <div
                         class="alert alert-dismissible fade show"
                         :class="{'alert-success': status == 200 || status == 201, 'alert-danger': status != 200  }"
                         role="alert">
                            {{ feedback }}
                            <button type="button" class="btn-close" @click="feedback = status = null"></button>
                        </div>
                    </div>

                    <div class="input-group mb-3">
                        <span class="input-group-text">@</span>
                        <input
                         type="email" 
                         @keypress.enter="sendOtp" 
                         class="form-control" 
                         placeholder="E-mail" 
                         aria-label="E-mail"
                         v-model="email">
                    </div>

                    <div class="d-flex justify-content-end">
                            <button class="btn btn-secondary" @click="sendOtp">
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
import { encrypt } from '../composables/enc';

let email = ref('')
let loading = ref(false)

let feedback = ref(null)
let status = ref(null)

const apihost = inject('apihost')

async function sendOtp() {
    feedback.value = status.value = null

    if (!email.value) {
        feedback.value = 'Input is required'
        return
    }

    loading.value = true

    let req = await fetch(`${apihost}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ email: email.value })
    })

    let res = await req.json()

    if (req.status == 200) {
        let encEmail = encrypt(email.value)
        router.push(`/forgot-password-otp?q=${encEmail}`)
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
</style>