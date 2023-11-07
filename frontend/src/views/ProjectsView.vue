<template>
    <div v-if="isDataReady" class="">
        <div class="row px-md-2">
            <Searchbar 
                placeholder="Search project"
            />
        </div>

        <div class="row flex justify-content-center gap-2 px-md-2">
            <div 
             v-for="project in projects"
             class="card col-sm-12 col-md-3 col-lg-4 col-4 px-0" 
             style="width: 16rem;"
            >
                <div class="position-relative">
                    <img :src="`data:image/jpeg;base64,${project.imageBase64}`" class="card-img-top px-0" alt="" style="height: 200px;">
                    <!-- Only for staff -->
                    <div
                     v-if="user.userType == 'staff'"
                     class="position-absolute top-0 end-0 p-2"
                    >
                        <ProjectActionBtns
                         :user="user"
                         :project="project.project"
                        />
                    </div>
                    <!--  -->
                </div>
                <div class="card-body px-2">
                    <h5 class="card-title col">{{ project.project.projectName }}</h5>

                    <p class="card-text mt-2">{{ (project.project.description).slice(0, 95) }} {{ (project.project.description).length > 95 ? '...' : '' }}</p>
                    <RouterLink :to="`/project/${project.project._id}`" class="btn btn-primary">See more</RouterLink>
                </div>
            </div>

        </div>
    </div>
    <div v-else class="m-5">
        <LoadingSpinner />
    </div>
</template>

<script setup>
import Searchbar from '@/components/Searchbar.vue';
import ProjectActionBtns from '@/components/projects/ProjectActionBtns.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import { useUser } from '@/store/useUser';
import { useProjects } from '@/store/useProjects';
import { storeToRefs } from 'pinia';
import { inject, ref } from 'vue';

let userStore = useUser()
let { user } = storeToRefs(userStore)

let projectsStore = useProjects()
let { projects } = storeToRefs(projectsStore)

const userEmail = inject('userEmail')
let isDataReady = ref(false)

async function getDataOnLoad() {
    if (!user.value ) {
        await userStore.getUserDetails(userEmail)
    }
    await projectsStore.getStaffProjects(user.value.id)
    isDataReady.value = true
}


getDataOnLoad()

</script>

<style lang="scss" scoped>

</style>