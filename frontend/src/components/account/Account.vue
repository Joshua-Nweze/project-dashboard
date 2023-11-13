<template>
    <div class="container emp-profile">
        <div class="row" v-if="isDataReady">
            <div class="col-md-6 offset-md-3">
                <div class="profile-head row mb-3">
                    <div class="col">
                        <h5>
                        {{ user.name }}
                        </h5>
                        <h6>
                            {{ (user.userType).charAt(0).toUpperCase() + (user.userType).slice(1) }}
                        </h6>
                    </div>
                    <div class="col">
                        <div class="d-flex justify-content-end">
                            <RouterLink to="/edit-account" class="btn btn-outline-secondary">Edit</RouterLink>
                        </div>
                    </div>
                </div>

                
                <div class="md-offset-3 col-md-8">
                    <div class=""> 
                        <strong>Email</strong>
                        <span  class="ms-2"> {{ user.email }}</span>
                    </div>
                    
                    <div class=""> 
                        <strong>Phone</strong>
                        <span class="ms-2"> {{ user.phoneNumber }}</span>
                    </div>
                    
                    <div class=""> 
                        <strong>LGA</strong>
                        <span class="ms-2"> {{ user.lga }}</span>
                    </div>
                </div>
            </div>
        </div>
        <LoadingSpinner v-else />
    </div>
</template>

<script setup>
import { useUser } from "@/store/useUser";
import { inject, ref } from "vue";
import { storeToRefs } from "pinia";
import LoadingSpinner from "../LoadingSpinner.vue";

let userEmail = inject('userEmail')

let userStore = useUser()
let { user } = storeToRefs(userStore)

let isDataReady = ref(false)

async function getDataOnLoad() {
    if (!user.value) {
       await userStore.getUserDetails(userEmail)
    }

    isDataReady.value = true
}
getDataOnLoad()
</script>

<style scoped>
.emp-profile{
    padding: 3%;
    margin-top: 3%;
    margin-bottom: 3%;
    border-radius: 0.5rem;
}

.profile-head h5{
    color: #333;
}
.profile-head h6{
    color: #0062cc;
}

.profile-head{
    font-weight:600;
    border: none;
}
.profile-head{
    border: none;
    border-bottom:2px solid #4a535d;
}
</style>