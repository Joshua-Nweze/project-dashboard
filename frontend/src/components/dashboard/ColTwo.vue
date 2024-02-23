<template>
    <div>
        <div>
            <div class="card">
                <div class="card-body">
                    <div class="fs-3 text-secondary">Recent projects</div>

                    <div v-if="(typeof projects == 'object' || typeof projects == 'array')">
                        <div
                            v-for="(project) in (projects).slice(0, 4)"
                            :key="project.index"
                            class="list-group p-1 px-2 my-2"
                        >

                            <RouterLink :to="`/project/${project._id}`" class="link" style="color: black;">
                                <div class="card p-2">
                                    <div class="card-title">{{ project.projectName }}</div>
                                    <div class="card-text text-muted" style="font-size: 13px;">{{ (project.description).slice(0, 20) }} {{ (project.description).length > 20 ? '...' : '' }}</div>
                                </div>
                            </RouterLink>
                            
                        </div>
                    </div>
                    <div v-else>
                        No recent project
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-3" v-if="user.userType == 'admin'">
            <div class="card">
                <div class="card-body">
                    <div class="fs-3 text-success">Recent staff</div>

                    <div v-if="(typeof staff == 'object' || typeof staff == 'array')">
                        <div
                            v-for="(user, index) in (staff).slice(0, 4)" :key="index"
                        >
                            <div class="list-group p-1 px-2 my-2 card bg-success-subtle">
                                <div class="card-title">{{ user.user.name }}</div>
                                <div class="text-muted card-text" style="font-size: 13px;">Registered on {{ new Date(user.user.createdAt).toDateString() }}</div>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        No recent staff
                    </div>

                </div>
            </div>
        </div>
    </div> 
</template>

<script setup>
import { useProjects } from '@/store/useProjects';
import { useUser } from '@/store/useUser';
import { useAdmin } from '@/store/useAdmin'
import { storeToRefs } from 'pinia';
import { inject } from 'vue';

const userEmail = inject('userEmail')

let userStore = useUser()
let projectsStore = useProjects()
let adminStore = useAdmin()

let { user } = storeToRefs(userStore)
let { projects } = storeToRefs(projectsStore)
let { staff, allProjects } = storeToRefs(adminStore)

async function getDataOnLoad() {
    if (user.value.userType == 'staff') {
        await projectsStore.getStaffProjects(user.value.id)
    } else if (user.value.userType == 'admin') {
        await adminStore.getAllProjects(user.value.id)
        await adminStore.getAllStaff(user.value.id)
        projects.value = allProjects.value
    }
}
getDataOnLoad()

</script>

<style scoped>
.div-list{
    padding: 10px 0;
    border-bottom: 1px solid #c8c9ca;
}

.updated-text{
    font-size: 13px;
    font-weight: 500;
}

.recent-project{
    background: linear-gradient(56deg, rgba(219,229,231,1) 8%, rgba(147,176,190,1) 55%, rgba(161,190,223,1) 100%);
}

.recent-staff {
    background: linear-gradient(56deg, rgba(219,231,220,1) 8%, rgba(147,190,158,1) 55%, rgba(161,223,177,1) 100%);
}

.link{
    text-decoration: none;
}

</style>