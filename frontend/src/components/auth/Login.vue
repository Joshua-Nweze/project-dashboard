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

                    <div class="forgot-pwd">
                        Forgot password
                    </div>

                    <div class="d-flex justify-content-end">
                            <button class="btn btn-secondary" :class="{'disable-click': loading}" @click="login">
                                <div v-if="!loading">
                                    Login
                                </div>

                                <div v-else class="spinner-border spinner-border-sm mx-2  " role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </button>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

    // import users from "@/db/users.json"
    // import { ref } from "@vue/reactivity";
    // import { useRouter } from "vue-router";
    // import { useUsers } from "@/store/useUsers"
    // import { storeToRefs } from "pinia";

    import Header from "./Header.vue";

    // let users = useUsers()
    
    // let {user} = storeToRefs(users)

    // let router = useRouter()

let email = ref('')
let password = ref('')

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

    let req = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
            email: email.value,
            password: password.value
        })
    })

    let res = await req.json()

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

    .disable-click{
        opacity: 0.6;
        pointer-events: none;
    }
    .disable-click:hover{
        cursor: not-allowed;
    }
</style>