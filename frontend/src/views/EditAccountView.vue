<template>
    <div>
        <div v-if="isDataReady">
            <div class="row justify-content-center">
                <div class="mx-md-5 px-md-5r col col-md-8">

                    <div v-if="feedback">
                        <div
                            class="alert alert-dismissible fade show"
                            :class="{'alert-success': status == 200 || status == 201, 'alert-danger': status != 200  }"
                            role="alert">
                            {{ feedback }}
                            <button type="button" class="btn-close" @click="( feedback = status = '' )"></button>
                        </div>
                    </div>

                    <div>
                        <h1 class="modal-title fs-5" id="editModalLabel">Edit account</h1>
                    </div>
                    <div class="mt-4">
                        <div class="mb-3">
                            <label for="name" class="form-label">Name</label>
                            <input type="text" class="form-control" id="name" v-model="name">
                        </div>
                        <div class="mb-3">
                            <label for="phone" class="form-label">Phone number</label>
                            <input type="tel" class="form-control" id="phone" v-model="phone">
                        </div>
                        <div class="mb-3">
                            <label for="lga" class="form-label">LGA</label>
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
                        </div>
                        
                        <div class="mb-3">
                            <div
                                class="btn btn-outline-secondary"
                                data-bs-toggle="modal" 
                                data-bs-target="#changePwdModal"
                            >
                                Change password
                            </div>
                        </div>
                    </div>
                    <div class="d-flex justify-content-end gap-2 mt-3">
                        <button type="button" class="btn btn-primary" @click="editAccount">
                            <div>
                                <div v-if="!isEditing">
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

            <div v-if="user.userType == 'staff'" class="row justify-content-center">
                <div class="mx-md-5 px-md-5r col col-md-8 mt-5 py-5">
                    <DeleteAccount />
                </div>
            </div>

            <!-- Change Pwd Modal -->
            <div class="modal fade" id="changePwdModal" tabindex="-1" aria-labelledby="changePwdModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="changePwdModalLabel">Change password</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">

                            <div v-if="changePwdFeedback">
                                <div
                                    class="alert alert-dismissible fade show"
                                    :class="{'alert-success': changePwdStatus == 200 || changePwdStatus == 201, 'alert-danger': changePwdStatus != 200  }"
                                    role="alert">
                                    {{ changePwdFeedback }}
                                    <button type="button" class="btn-close" @click="( changePwdFeedback = changePwdStatus = '' )"></button>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="current-password" class="form-label">Current password</label>
                                <input type="password" class="form-control" id="current-password" v-model="currentPassword">
                            </div>
                            <div class="mb-3">
                                <label for="new-password" class="form-label">New password</label>
                                <input type="password" class="form-control" id="new-password" v-model="newPassword">
                            </div>
                            <div class="mb-3">
                                <label for="re-new-password" class="form-label">Enter new password again</label>
                                <input type="password" class="form-control" id="re-new-password" v-model="reNewPassword">
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

        <LoadingSpinner v-else />
    </div>
</template>

<script setup>
import { useUser } from "@/store/useUser";
import { useAdmin } from "@/store/useAdmin";
import { inject, ref } from "vue";
import { storeToRefs } from "pinia";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import SmallLoadingSpinner from "@/components/SmallLoadingSpinner.vue";
import DeleteAccount from "@/components/account/DeleteAccount.vue";

let userEmail = inject('userEmail')

let userStore = useUser()
let adminStore = useAdmin()
let { user } = storeToRefs(userStore)
import Cookies from "js-cookie";

let cookie = Cookies.get('token')

let name = ref('')
let phone = ref('')
let lga = ref('')

let isDataReady = ref(false)

async function getDataOnLoad() {
    if (!user.value) {
       await userStore.getUserDetails(userEmail, cookie)

       if (user.value.userType == 'staff') {
            await projectsStore.getStaffProjects(user.value.id)
        } else {
            await adminStore.getAllProjects(user.value.id)
        }
    }

    name.value = user.value.name
    phone.value = user.value.phoneNumber
    lga.value = user.value.lga

    isDataReady.value = true
}
getDataOnLoad()

let isEditing = ref(false)

let feedback = ref('')
let status = ref('')

let phoneNumberRegex = /^(\+234\d{10}|0[789][01]\d{8})$/

async function editAccount() {
    feedback.value = status.value = ''

    if(!name.value || !phone.value || !lga.value || !useUser || ! user.value.id) {
        feedback.value = 'All inputs are required'
        status.value = 400

        isEditing.value = false
        return
    }
    if (!phoneNumberRegex.test(phone.value)) {
        feedback.value = 'Enter valid Nigerian phone number'
        return
    }

    isEditing.value = true

    let req = await userStore.editAccount(
        name.value,
        phone.value,
        lga.value,
        user.value.id,
        userEmail
    )

    feedback.value = req.message
    status.value = req.status

    isEditing.value = false
}

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

    changePwdFeedback.value = req.message
    changePwdStatus.value = req.status
    
    isChangingPwd.value = false
}
</script>

<style scoped>

</style>