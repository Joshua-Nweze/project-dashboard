<template>
    
       
    <div class="row justify-content-center">
        
        <div class="col-lg-6 col-xl-4 col-md-8 col-sm-10">
            <div class="card">
                <div class="card-body">
                    <div class="fs-2">ESHDC Dashboard</div>

                    <div class="fs-4 text-secondary mb-4">Login to continue</div>
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
                        <span class="input-group-text" id="basic-addon1">@</span>
                        <input type="email" class="form-control" placeholder="E-mail" aria-label="E-mail" aria-describedby="basic-addon1" v-model="email">
                    </div>

                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1"><i class="bi bi-lock"></i></span>
                        <input type="password" class="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1" v-model="password">
                    </div>

                    <div class="forgot-pwd">
                        Forgot password
                    </div>

                    <div class="d-flex justify-content-end">
                        <!-- <router-link to="/dashboard"> -->
                            <button class="btn btn-secondary" @click="login">Login</button>
                        <!-- </router-link> -->
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    // import users from "@/db/users.json"
    import { ref } from "@vue/reactivity";
    import { useRouter } from "vue-router";
    import { useUsers } from "@/store/useUsers"
    import { storeToRefs } from "pinia";

    let users = useUsers()
    
    let {user} = storeToRefs(users)

    let router = useRouter()

    let email = ref('')
    let password = ref('')

    let userDetails = user.value.userDetails
    let showErrMsg = ref(false)
    let showSuccess = ref()

    function login() {
        for (let i = 0; i < userDetails.length; i++) {
            if(email.value == userDetails[i].email && password.value == userDetails[i].password){
                console.log('success');
                showSuccess.value = true
                showErrMsg.value = false
                setTimeout(()=> {
                    router.push("/dashboard")
                    password.value = ""
                }, 1500)
            } else {
                console.log('unsuccess');
                showErrMsg.value = true
                password.value = ""
            }
        }
    }

    function closeShowErrMsg () {
        showErrMsg.value = false
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