<template>
    <div class="bg-danger-subtle rounded p-3">
        <div class="fs-5 mb-2 text-danger fw-bold"><i class="bi bi-exclamation-triangle"></i> Danger Zone <i
                class="bi bi-exclamation-triangle"></i></div>
        <div class="fs-5 mb-2 text-danger">Delete account</div>
        <div class="text-danger">By deleting your account you will loose all access to your account, and all your projects
            will be deleted. <strong>This action is irrevisble.</strong>
        </div>

        <div class="col-12 d-flex justify-content-end mt-3" v-if="!showDelAccSection">
            <div class="d-flex justify-content-end">
                <button type="button" class="btn btn-danger" @click="showDelAccSection = true">Delete account</button>
            </div>
        </div>

        <!-- delete account section -->
        <div v-if="showDelAccSection" class="mt-3">
            <div v-if="feedback">
                <div class="alert alert-dismissible bg-danger-sublte text-danger border border-danger fade show">
                    {{ feedback }}
                    <button type="button" class="btn-close" @click="feedback = ''"></button>
                </div>
            </div>
            <div class="mb-3">
                <label for="firstName" class="form-label">Password</label>
                <input type="password" class="form-control" placeholder="Enter password" v-model="password">
            </div>

            <div class="d-flex justify-content-end gap-3">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                    @click="() => {
                        password = ''
                        showDelAccSection = false
                    }">Close</button>
                <span>
                    <button type="button" class="btn btn-danger" @click="delAccount" v-if="!isDeleting">Delete account</button>
                    <button type="button" class="btn btn-danger" v-else>
                        <SmallLoadingSpinner />
                    </button>
                </span>
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
import { inject } from "vue";

let userStore = useUser()

let { user } = storeToRefs(userStore)

let apihost = inject('apihost')

let password = ref(null)

let feedback = ref('')
let isDeleting = ref(false)

let showDelAccSection = ref(false)

async function delAccount() {
    feedback.value = ''

    if (!password.value) {
        feedback.value = 'Enter your password'
        return
    }

    isDeleting.value = true

    let req = await fetch(`${apihost}/api/user/delete-account`, {
        method: 'DELETE',
        credentials: 'include',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ 
            password: password.value,
            email: user.value.email,
            id: user.value.id
         })
    })

    let res = await req.json()

    if (req.status == 200) {
        console.log('goner')
        Cookies.remove('token')
        router.push('/')
    }

    isDeleting.value = false
    feedback.value = res.message
    password.value = ''
}
</script>

<style scoped></style>