<template>
    <div class="row justify-content-center">
        <div class="col-lg-6 col-xl-4 col-md-8 col-sm-10">
            <div class="card border-0">
                <div class="card-body">

                    <Header title="Enter your password" />

                    <div v-if="feedback" class="alert alert-dismissible fade show" role="alert" :class="[ status == 200 || status == 201 ? 'alert-success' : 'alert-danger' ]">
                        {{ feedback }}
                        <button @click="feedback = null" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>

                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">@</span>
                        <input type="email" @keypress.enter="check" class="form-control" placeholder="E-mail"
                            aria-label="E-mail" aria-describedby="basic-addon1" v-model="email">
                    </div>

                    <div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1"><i class="bi bi-lock"></i></span>
                            <input type="password" @keypress.enter="check" class="form-control" placeholder="Password"
                                aria-label="Password" aria-describedby="basic-addon1" v-model="password">
                        </div>
                        <div class="form-text" id="basic-addon4">Enter password sent to your email.</div>
                    </div>

                    <div class="d-flex justify-content-end">
                        <button class="btn btn-secondary" @click="check" @keypress.enter="check">
                            <span v-if="!isChecking">Continue</span>
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
import { inject, ref } from 'vue';
import { useRoute } from 'vue-router';
import SmallLoadingSpinner from '@/components/SmallLoadingSpinner.vue';
import { AES }  from 'crypto-js'
import { encrypt, decrypt } from '../composables/enc'
import router from '@/router';

const apihost = inject('apihost')

let route = useRoute()
let feedback = ref('')

let email = ref(route.query.q)
let password = ref('')

email.value = decrypt(email.value)

let isChecking = ref(false)
let status = ref(null)

async function check() {
    if (!email.value || !password.value) {
        feedback.value = 'All inputs are required'
        return
    }

    feedback.value = status.value = null
    isChecking.value = true

    let req = await fetch(`${apihost}/api/setup/check-password`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ 
            email: email.value,
            password: password.value
        })
    })

    let res = await req.json()

    if (req.status == 200) {
        password.value = encrypt(password.value)
        email.value = encrypt(email.value)

        router.push(`/setup/details?q=${email.value}&r=${password.value}`)
    } else {
        password.value = ''
    }

    isChecking.value = false
    feedback.value = res.message
    status.value = req.status
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