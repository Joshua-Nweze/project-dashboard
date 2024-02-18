<template>
    <div class="container emp-profile">
        <div class="row" v-if="isDataReady">
            <div class="col-md-6 offset-md-3">
                <div class="profile-head row mb-3">
                    <div class="col">
                        <h5>
                            {{ user.name || user.email }}
                        </h5>
                        <h6>
                            {{ (user.userType).charAt(0).toUpperCase() + (user.userType).slice(1) }}
                        </h6>
                    </div>
                    <div class="col">
                        <div class="d-flex justify-content-end" v-if="user.userType == 'staff'">
                            <RouterLink to="/edit-account" class="btn btn-outline-secondary">Edit</RouterLink>
                        </div>
                        <div class="d-flex justify-content-end mb-2" v-else>
                            <div class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#changePwdModal">
                                Change password</div>
                        </div>
                    </div>
                </div>


                <div class="md-offset-3 col-md-8" v-if="user.userType == 'staff'">
                    <div class="">
                        <strong>Email</strong>
                        <span class="ms-2"> {{ user.email }}</span>
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

            <div v-if="user.userType == 'admin'">
                <!-- Chanhe Pwd modal -->
                <div class="modal fade" id="changePwdModal" tabindex="-1" aria-labelledby="changePwdModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="changePwdModalLabel">Change password</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">

                                <div v-if="changePwdFeedback">
                                    <div class="alert alert-dismissible fade show"
                                        :class="{ 'alert-success': changePwdStatus == 200 || changePwdStatus == 201, 'alert-danger': changePwdStatus != 200 }"
                                        role="alert">
                                        {{ changePwdFeedback }}
                                        <button type="button" class="btn-close"
                                            @click="(changePwdFeedback = changePwdStatus = '')"></button>
                                    </div>
                                </div>

                                <div class="mb-3">
                                    <label for="current-password" class="form-label">Current password</label>
                                    <input type="password" class="form-control" id="current-password"
                                        v-model="currentPassword">
                                </div>
                                <div class="mb-3">
                                    <label for="new-password" class="form-label">New password</label>
                                    <input type="password" class="form-control" id="new-password" v-model="newPassword">
                                </div>
                                <div class="mb-3">
                                    <label for="re-new-password" class="form-label">Enter new password again</label>
                                    <input type="password" class="form-control" id="re-new-password"
                                        v-model="reNewPassword">
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" @click="changePassword">
                                    <div>
                                        <div v-if="!isChangingPwd">
                                            Save changes
                                        </div>
                                        <div v-else>
                                            <SmallLoadingSpinner />
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
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
import SmallLoadingSpinner from "../SmallLoadingSpinner.vue";
import { useAdmin } from "@/store/useAdmin";
import { useProjects } from "@/store/useProjects";
import Cookies from "js-cookie";

let cookie = Cookies.get('token')
let projectsStore = useProjects()

let userEmail = inject('userEmail')

let userStore = useUser()
let { user } = storeToRefs(userStore)

let adminStore = useAdmin()

let isDataReady = ref(false)

async function getDataOnLoad() {
    if (!user.value) {
        await userStore.getUserDetails(userEmail, cookie)

        if (user.value.userType == 'admin') {
            await adminStore.getUnansweredInvites(user.value.id)
            await adminStore.getAllProjects(user.value.id)
            await adminStore.getAllStaff(user.value.id)
        } else if (user.value.userType == 'staff') {
            await projectsStore.getStaffProjects(user.value.id)
        }
    }

    isDataReady.value = true
}
getDataOnLoad()

let currentPassword = ref('')
let newPassword = ref('')
let reNewPassword = ref('')

let changePwdFeedback = ref('')
let changePwdStatus = ref('')
let isChangingPwd = ref('')

async function changePassword() {
    isChangingPwd.value = true

    changePwdFeedback.value = changePwdStatus.value = ''

    if (!user.value.id || !currentPassword.value || !newPassword.value || !reNewPassword.value) {
        changePwdFeedback.value = 'All inputs are required'
        changePwdStatus.value = 400

        isChangingPwd.value = false
        return
    }
    if (newPassword.value.length < 6) {
        changePwdFeedback.value = 'New password length must be greater than 6'
        changePwdStatus.value = 400

        isChangingPwd.value = false
        return
    }
    if (newPassword.value != reNewPassword.value) {
        changePwdFeedback.value = 'New password and new password confirmation must match'
        changePwdStatus.value = 400

        isChangingPwd.value = false
        return
    }

    let req = await userStore.changePassword(
        user.value.id,
        currentPassword.value,
        newPassword.value,
        reNewPassword.value
    )

    currentPassword.value = newPassword.value = reNewPassword.value = ''

    changePwdFeedback.value = req.message
    changePwdStatus.value = req.status

    isChangingPwd.value = false
}
</script>

<style scoped>
.emp-profile {
    padding: 3%;
    margin-top: 3%;
    margin-bottom: 3%;
    border-radius: 0.5rem;
}

.profile-head h5 {
    color: #333;
}

.profile-head h6 {
    color: #0062cc;
}

.profile-head {
    font-weight: 600;
    border: none;
}

.profile-head {
    border: none;
    border-bottom: 2px solid #4a535d;
}</style>