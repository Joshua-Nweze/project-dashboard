<template>
    <div>
        <div v-if="isDataReady">
            <div
                v-if="typeof projects == 'array' || typeof projects == 'object'"
            >
                <div class="row px-md-2">
                    <div class="input-group mb-5">
                        <input
                            type="text"
                            class="form-control"
                            placeholder="Search project"
                            v-model="search"
                        />
                    </div>
                </div>

                <div class="row flex justify-content-center gap-2 px-md-2">
                    <div
                        v-if="retrivedProjects.length > 0"
                        v-for="(project, index) in retrivedProjects"
                        :key="index"
                        class="card col-sm-12 col-md-3 col-lg-4 col-4 px-0"
                        style="width: 16rem"
                    >
                        <div class="position-relative">
                            <img
                                :src="`data:image/jpeg;base64,${project.image.imageBase64}`"
                                class="card-img-top px-0"
                                alt="project image thumbnail"
                                style="height: 200px"
                            />
                            <!-- Only for staff -->
                            <div
                                v-if="user.userType == 'staff'"
                                class="position-absolute top-0 end-0 p-2"
                            >
                                <ProjectActionBtns
                                    :user="user"
                                    :project="project"
                                    :editModalId="`editModalId${index}`"
                                    :deleteModalId="`deleteModalId${index}`"
                                />
                            </div>
                            <!--  -->
                        </div>
                        <div class="card-body px-2">
                            <h5 class="card-title col">
                                {{ project.projectName }}
                            </h5>

                            <p class="card-text mt-2">
                                {{ project.description.slice(0, 95) }}
                                {{ project.description.length > 95 ? "..." : "" }}
                            </p>
                            <RouterLink
                                :to="`/project/${project._id}`"
                                class="btn btn-primary"
                                >See more</RouterLink
                            >
                        </div>
                    </div>

                    <div v-else class="text-center">
                        No project with "{{ search }}" found. <br />
                        Change the search term and try again
                    </div>
                </div>
            </div>
            <div v-else>
                <NothingToShow />
            </div>
        </div>
        <div v-else class="m-5">
            <LoadingSpinner />
        </div>
    </div>
</template>

<script setup>
import ProjectActionBtns from "@/components/projects/ProjectActionBtns.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import { useUser } from "@/store/useUser";
import { useProjects } from "@/store/useProjects";
import { storeToRefs } from "pinia";
import { inject, ref, watch } from "vue";
import NothingToShow from "../components/NothingToShow.vue";
import { useAdmin } from "@/store/useAdmin";
import ErrorReload from "@/components/ErrorReload.vue";
import Cookies from "js-cookie";

let userStore = useUser();
let { user } = storeToRefs(userStore);

let projectsStore = useProjects();
let { projects } = storeToRefs(projectsStore);

let adminStore = useAdmin();
let { allProjects } = storeToRefs(adminStore);

const userEmail = inject("userEmail");
let isDataReady = ref(false);
let error = ref(false);

let cookie = Cookies.get('token')

let retrivedProjects = ref(null);

async function getDataOnLoad() {
    if (!user.value) {
        let req = await userStore.getUserDetails(userEmail, cookie);

        if (req.status == 500) {
            error.value = true;
            return;
        }

        if (user.value.userType == "staff") {
            let req = await projectsStore.getStaffProjects(user.value.id);

            if (req.status == 500) {
                error.value = true;
                return;
            }

            retrivedProjects.value = req.message;
            isDataReady.value = true;
        } else {
            await adminStore.getUnansweredInvites(user.value.id);
            await adminStore.getAllProjects(user.value.id);
            let req = await adminStore.getAllProjects(user.value.id);

            if (req.status == 500) {
                error.value = true;
                return;
            }

            retrivedProjects.value = allProjects.value;
        }
    }

    console.log(projects.value);

    if (user.value.userType == "staff") {
        search.value = "";
        retrivedProjects.value = projects.value;
    } else {
        search.value = "";
        retrivedProjects.value = allProjects.value;
    }
    isDataReady.value = true;
}

let search = ref("");

watch(search, (newSearch) => {
    if (user.value.userType == "staff") {
        retrivedProjects.value = projects.value;
        if (newSearch == "" || !newSearch) {
            retrivedProjects.value = projects.value;
        }
    } else if (user.value.userType == "admin") {
        retrivedProjects.value = allProjects.value;
        if (newSearch == "" || !newSearch) {
            retrivedProjects.value = allProjects.value;
        }
    }

    let filteredProjects = [];

    retrivedProjects.value.forEach((project) => {
        if (
            project.projectName.toLowerCase().includes(newSearch.toLowerCase())
        ) {
            filteredProjects.push(project);
        }
    });
    retrivedProjects.value = filteredProjects;
});

getDataOnLoad();
</script>

<style scoped>
.form-control:focus {
    border-color: #6c757d;
    box-shadow: none;
}
</style>
