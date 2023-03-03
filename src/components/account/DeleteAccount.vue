<template>
    <div>
        <div class="fs-5 mb-2 text-danger">Delete account</div>
            <div class="text-danger">By deleting your account you will loose all access to your account. <strong>This action is irrevisble</strong></div>
            <div class="col-12 mt-3">
                <div class="mb-3">
                    <label for="firstName" class="form-label">Password</label>
                    <input type="text" class="form-control" placeholder="Enter password" v-model="password">
                </div>
            </div>

            <div class="col-12 d-flex justify-content-end">
                <div class="col-2 d-flex justify-content-end">
                    <button type="button" class="btn btn-danger" ref="button" @mouseover="checkPasswordInput">Delete</button>
                </div>
            </div>
    </div>
</template>

<script setup>
    import { ref } from "@vue/reactivity";
    import { onMounted, onUpdated } from "@vue/runtime-core";

    let password = ref(null)
    let button = ref(null)

    function checkPasswordInput() {
        if (password.value == null || password.value == '') {
            button.value.classList.add('hover-not-allowed')
        } else {
            button.value.classList.remove('hover-not-allowed')
        }
    }
</script>

<style scoped>
    .hover-not-allowed:hover{
        cursor: not-allowed;
    }
</style>