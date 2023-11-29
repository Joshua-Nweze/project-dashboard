<template>
    <div class="row justify-content-center">
        <div class="col-lg-6 col-xl-4 col-md-8 col-sm-10">
            <div class="card border-0">
                <div class="card-body">

                    <Header title="Enter your details" />

                    <div v-if="feedback" class="alert alert-dismissible fade show" role="alert" :class="[ status == 200 || status == 201 ? 'alert-success' : 'alert-danger' ]">
                        {{ feedback }}.
                        <div v-if="status == 201" class="fw-bold mt-3">
                            Taking you to login page in {{ countdown }}
                        </div>
                        <button @click="feedback = null" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>

                    <div class="input-group mb-3">
                        <input type="text" @keypress.enter="login" class="form-control" placeholder="Full Name" aria-label="E-mail" aria-describedby="basic-addon1" v-model="name">
                    </div>
                    <div class="input-group mb-3">
                        <select name="lga" class="form-control" v-model="lga">
                            <option value="">-- Select LGA --</option>
                            <option value="Aninri">Aninri</option>
                            <option value="Awgu">Awgu</option>
                            <option value="Enugu East">Enugu East</option>
                            <option value="Enugu North">Enugu North</option>
                            <option value="Enugu South">Enugu South</option>
                            <option value="Ezeagu">Ezeagu</option>
                            <option value="Igbo Etiti">Igbo Etiti</option>
                            <option value="Igbo Eze North">Igbo Eze North</option>
                            <option value="Igbo Eze South">Igbo Eze South</option>
                            <option value="Isi Uzo">Isi Uzo</option>
                            <option value="Nkanu East">Nkanu East</option>
                            <option value="Nkanu West">Nkanu West</option>
                            <option value="Nsukka">Nsukka</option>
                            <option value="Oji River">Oji River</option>
                            <option value="Udenu">Udenu</option>
                            <option value="Udi">Udi</option>
                            <option value="Uzo-Uwani">Uzo-Uwani</option>
                        </select>
                    </div>
                    <div class="input-group mb-3">
                        <input type="tel" @keypress.enter="login" class="form-control" placeholder="Phone" aria-label="E-mail" aria-describedby="basic-addon1" v-model="phoneNumber">
                    </div>

                    <div class="d-flex justify-content-end">
                        <button class="btn btn-secondary" @click="createAccount">
                            <span v-if="!isCreatingAccount">Create account</span>
                            <span class="px-3" v-else><SmallLoadingSpinner /></span>
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
import { useRoute } from 'vue-router';
import CryptoJS, { AES } from 'crypto-js';
import SmallLoadingSpinner from '@/components/SmallLoadingSpinner.vue';
import router from '@/router';

let route = useRoute()

let name = ref('')
let lga = ref('')
let phoneNumber = ref('')

let feedback = ref(null)
let status = ref(null)

let email = ref(route.query.email)
let encPwd = ref(route.query.r)

let phoneNumberRegex = /^(\+234\d{10}|0[789][01]\d{8})$/

let isCreatingAccount = ref(false)
let countdown = ref(5)

async function createAccount() {
    isCreatingAccount.value = true
    feedback.value = status.value = null

    const pwd = await AES.decrypt(encPwd.value, process.env.VUE_APP_CRYPTO_KEY).toString(CryptoJS.enc.Utf8);
    
    if(!name.value || !email.value || !phoneNumber.value) {
        feedback.value = 'All inputs are required'
        return
    }

    if (!phoneNumberRegex.test(phoneNumber.value)) {
        feedback.value = 'Enter valid Nigerian phone number'
        return
    }

    let req = await fetch('http://localhost:3000/api/setup/setup-details', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
            email: email.value,
            password: pwd,
            name: name.value,
            lga: lga.value,
            phoneNumber: phoneNumber.value
        })
    })

    let res = await req.json()

    status.value = req.status
    feedback.value = res.message

    isCreatingAccount.value = false

    if (req.status == 201) {
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