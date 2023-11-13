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
                            <input type="text" class="form-control" id="lga" v-model="lga">
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
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
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

            <!-- Change Pwd Modal -->
            <div class="modal fade" id="changePwdModal" tabindex="-1" aria-labelledby="changePwdModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="changePwdModalLabel">Change password</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mb-3">
                                <label for="current-password" class="form-label">Current password</label>
                                <input type="password" class="form-control" id="current-password" >
                            </div>
                            <div class="mb-3">
                                <label for="new-password" class="form-label">New password</label>
                                <input type="password" class="form-control" id="new-password" >
                            </div>
                            <div class="mb-3">
                                <label for="re-new-password" class="form-label">Enter new password again</label>
                                <input type="password" class="form-control" id="re-new-password" >
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">
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
            </div>
        </div>

        <LoadingSpinner v-else />
    </div>
</template>

<script setup>
import { useUser } from "@/store/useUser";
import { inject, ref } from "vue";
import { storeToRefs } from "pinia";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import SmallLoadingSpinner from "@/components/SmallLoadingSpinner.vue";

let userEmail = inject('userEmail')

let userStore = useUser()
let { user } = storeToRefs(userStore)

let name = ref('')
let phone = ref('')
let lga = ref('')

let isDataReady = ref(false)

async function getDataOnLoad() {
    if (!user.value) {
       await userStore.getUserDetails(userEmail)
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

async function editAccount() {
    isEditing.value = true

    feedback.value = status.value = ''

    let req = await userStore.editAccount(
        name.value,
        phone.value,
        lga.value,
        user.value.id,
        userEmail
    )

    console.log(req)
    feedback.value = req.message
    status.value = req.status

    isEditing.value = false
}
</script>

<style scoped>

</style>