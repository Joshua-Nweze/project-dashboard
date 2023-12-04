<template>
    <div class="bg-danger-subtle rounded p-3">
        <div class="fs-5 mb-2 text-danger fw-bold"><i class="bi bi-exclamation-triangle"></i> Danger Zone <i
                class="bi bi-exclamation-triangle"></i></div>
        <div class="fs-5 mb-2 text-danger">Delete account</div>
        <div class="text-danger">By deleting your account you will loose all access to your account, and all your projects
            will be deleted. <strong>This action is irrevisble.</strong>
        </div>

        <div class="col-12 d-flex justify-content-end mt-3">
            <div class="d-flex justify-content-end">
                <button type="button" class="btn btn-danger" data-bs-toggle="modal"
                    data-bs-target="#deleteAccountModal">Delete account</button>
            </div>
        </div>
    </div>


    <!-- Del account modal -->
    <div class="modal fade" id="deleteAccountModal" tabindex="-1" aria-labelledby="deleteAccountModalLabel"
        aria-hidden="true" ref="delAccountModal">
        <div class="modal-dialog">

            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5 text-danger" id="exampleModalLabel">Delete Account</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="feedback = password = ''"></button>
                </div>
                <div class="modal-body">
                    <div v-if="feedback">
                        <div class="alert alert-dismissible alert-danger fade show">
                            {{ feedback }}
                            <button type="button" class="btn-close" @click="feedback = ''"></button>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="firstName" class="form-label">Password</label>
                        <input type="password" class="form-control" placeholder="Enter password" v-model="password">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="password = ''">Close</button>
                    <span>
                        <button type="button" class="btn btn-danger" @click="delAccount" v-if="!isDeleting">Delete account</button>
                        <button type="button" class="btn btn-danger" v-else>
                            <SmallLoadingSpinner />
                        </button>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import router from "@/router";
import { ref } from "@vue/reactivity";
import SmallLoadingSpinner from "../SmallLoadingSpinner.vue";
import { useUser } from "@/store/useUser";
import { storeToRefs } from "pinia";
import Cookies from "js-cookie";

let userStore = useUser()

let { user } = storeToRefs(userStore)

console.log(user.value)

let password = ref(null)

let feedback = ref('')
let isDeleting = ref(false)

let delAccountModal = ref(null)

async function delAccount() {
    delAccountModal.value.style.display = 'none'
    delAccountModal.value.classList.remove('show')
    // feedback.value = ''

    // if (!password.value) {
    //     feedback.value = 'Enter your password'
    //     return
    // }

    // isDeleting.value = true

    // let req = await fetch('http://localhost:3000/api/user/delete-account', {
    //     method: 'DELETE',
    //     credentials: 'include',
    //     headers: { 'Content-type': 'application/json' },
    //     body: JSON.stringify({ 
    //         password: password.value,
    //         email: user.value.email,
    //         id: user.value.id
    //      })
    // })

    // let res = await req.json()

    // if (req.status == 200) {
    //     console.log('goner')
    //     Cookies.remove('token')
    //     router.push('/')
    // }

    // isDeleting.value = false
    // feedback.value = res.message
}
</script>

<style scoped></style>