<template>
    <div class="row justify-content-center">
        <div class="col-lg-6 col-xl-4 col-md-8 col-sm-10">
            <div class="card border-0">
                <div class="card-body">

                    <Header title="Enter your email" />

                    <div v-if="feedback" class="alert alert-danger alert-dismissible fade show" role="alert">
                        {{ feedback }}
                        <button @click="feedback = null" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>

                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">@</span>
                        <input type="email" @keypress.enter="next" class="form-control" placeholder="E-mail"
                            aria-label="E-mail" aria-describedby="basic-addon1" v-model="email">
                    </div>

                    <div class="d-flex justify-content-end">
                        <button class="btn btn-secondary" @keypress.enter="next" @click="next">
                            <span v-if="!isChecking">Continue</span>
                            <span v-else><SmallLoadingSpinner /></span>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Header from '@/components/auth/Header.vue';
import { ref } from 'vue';
import router from '@/router';
import { encrypt } from '../composables/enc'
import SmallLoadingSpinner from '@/components/SmallLoadingSpinner.vue';

let email = ref('')
let feedback = ref(null)
let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

let isChecking = ref(false)

async function next() {
    feedback.value = null

    if (!email.value) {
        feedback.value = 'Please enter your email'
        return
    }

    if (!emailRegex.test(email.value)) {
        feedback.value = 'Please enter a valid email'
        return
    }

    isChecking.value = true

    let req = await fetch('http://localhost:3000/api/setup/check-email', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ email: email.value })
    })

    let res = await req.json()

    if(req.status == 200){
        email.value = encrypt(email.value)
        router.push(`/setup/password?q=${email.value}`)
    }

    feedback.value = res.message
    isChecking.value = false
}
</script>

<style scoped>
* {
    overflow-x: hidden;
}

.row {
    /* Hide scrollbar for IE, Edge add Firefox */
    -ms-overflow-style: none;
    scrollbar-width: none;
    /* Firefox */

    --bs-gutter-x: 0;
    --bs-gutter-y: 0
}

.row::-webkit-scrollbar {
    display: none;
}

.forgot-pwd {
    font-size: 12px;
}

.form-control:focus {
    border-color: #6c757d;
    box-shadow: none;
}

.row {
    margin-top: 80px;
}
</style>