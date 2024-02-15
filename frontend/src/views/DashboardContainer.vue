<template>
    <div class="body">
        <div class="row container-fluid">
            <div class="col-2 d-none d-lg-block">
                <Sidenav class="side-nav" />
            </div>

            <div class="col-lg-10 col-sm-12 col-md-12 main">
                <Nav />
                <div class="router-view p-4">

                    <div v-if="isDataReady">
                        <div v-if="!error">
                            <router-view />
                        </div>
                        <div v-else>
                            <ErrorReload />
                        </div>
                    </div>
                    
                    <div v-else>
                        <LoadingSpinner />
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    </div>
</template>

<script setup>
import Nav from "@/components/navbar/Nav";
import Sidenav from "@/components/navbar/Sidenav";
import Footer from "@/components/Footer";
import { storeToRefs } from "pinia";
import ErrorReload from "@/components/ErrorReload.vue";

import { useUser } from "@/store/useUser";
import { useProjects } from "@/store/useProjects";
import { useAdmin } from "@/store/useAdmin";

import { provide, ref } from "vue";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

let cookie = Cookies.get("token");
let decoded = jwtDecode(cookie);
import LoadingSpinner from "@/components/LoadingSpinner.vue";

let userStore = useUser();
let { user } = storeToRefs(userStore);

let adminStore = useAdmin();

let projectsStore = useProjects();

let isDataReady = ref(false);
const userEmail = decoded.id;

let error = ref(null);

async function getDataOnLoad() {
    if (!user.value) {
        let req = await userStore.getUserDetails(userEmail);

        if (req.status == 500) {
            error.value = true;
            isDataReady.value = true;
            return;
        }
    }

    if (user.value.userType == "staff") {
        await projectsStore.getStaffProjects(user.value.id);
    } else {
        await adminStore.getAllStaff(user.value.id);
        await adminStore.getAllProjects(user.value.id);

        // getting unanswered invites
        await adminStore.getUnansweredInvites(user.value.id);
    }

    isDataReady.value = true;
}
getDataOnLoad();

provide("userEmail", decoded.id);
</script>

<style scoped>
* {
    overflow-x: hidden;
}

.body {
    background-color: var(--bs-gray-100);
}

.main {
    min-height: 100vh;
    display: flex;
    flex-flow: column;
}

.row > * {
    padding-left: 0;
    padding-right: 0;
}

.container-fluid,
.container-lg,
.container-md,
.container-sm,
.container-xl,
.container-xxl {
    --bs-gutter-x: 1.5rem;
    --bs-gutter-y: 0;
    width: 100%;
    padding-right: 0;
    padding-left: 0;
    margin-right: 0;
    margin-left: 0;
}

.router-view {
    position: relative;
    flex-grow: 1;
}
</style>
