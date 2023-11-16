<template>
    <div>
        <div v-if="isDataReady">
            <div v-if="user.userType == 'admin'">
                <div class="row justify-content-center">
                    <div class="col-md-10 col-sm-12">
                        <div class="admins">
                            Staff
                        </div>

                        <button class="btn btn-secondary my-3" data-bs-toggle="modal" data-bs-target="#inviteAdmin"><i class="bi bi-person-add"></i> Enroll a new staff</button>

                        <div>
                            <div v-if="(typeof staff == 'object' || typeof staff == 'array')">
                                <div class="row fw-bold">
                                    <div class="col">Full name</div>
                                    <div class="col d-none d-sm-block">Email</div>
                                    <div class="col d-none d-md-block">Date registered</div>
                                    <div class="col ">Action</div>
                                </div>

                                <div
                                v-for="(staff, index) in staff"
                                :key="index"
                                class="row my-3 align-items-center">
                                    <div class="col">{{ staff.name }}</div>
                                    <div class="col d-none d-sm-block">{{ staff.email }}</div>
                                    <div class="col d-none d-md-block">{{ new Date(staff.createdAt).toDateString() }}</div>
                                    <div class="col">

                                        <button @click="viewUser(staff._id)" type="button" class="btn bg-primary-subtle" data-bs-toggle="modal" :data-bs-target="`#view_${index}`">
                                            <i class="bi bi-eye text-primary"></i>
                                        </button>

                                        <button type="button" class="mx-1 btn bg-warning-subtle" data-bs-toggle="modal" :data-bs-target="`#block_${index}`"><i class="bi bi-person-lock text-warning"></i></button>
                                        
                                        <!-- <button type="button" class="btn bg-danger-subtle"><i class="bi bi-trash text-danger"></i></button> -->
                                    </div>

                                    <!-- View user modal -->
                                    <div class="modal fade" tabindex="-1"  :id="`view_${index}`" aria-labelledby="view" aria-hidden="true">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div v-if="userDetails">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title">{{ userDetails.user.name }}</h5>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <div><span class="fw-bold">LGA:</span> {{ userDetails.user.lga }}</div>
                                                        <div><span class="fw-bold">Phone:</span> {{ userDetails.user.phoneNumber }}</div>
                                                        <div><span class="fw-bold">Email:</span> {{ userDetails.user.email }}</div>
                                                        <div><span class="fw-bold">Total number of projects:</span> {{ typeof userDetails.projects == 'object' || typeof userDetails.projects == 'array' ? userDetails.projects.length : 0  }}</div>
                                                        <div><span class="fw-bold">Projects completed:</span> {{ userDetailsFinisedProjects.length }}</div>
                                                        <div><span class="fw-bold">Ongoing projects:</span> {{ userDetailsOngoingProjects.length }}</div>
                                                    </div>
                                                </div>

                                                <div v-else>
                                                    <LoadingSpinner />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Block modal -->
                                    <div class="modal fade" tabindex="-1"  :id="`block_${index}`" aria-labelledby="block" aria-hidden="true" @click="clearFeedbackAndStatus">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title">Block {{ staff.name }}</h5>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="clearFeedbackAndStatus"></button>
                                                </div>
                                                <div class="modal-body">

                                                    
                                                    <div v-if="feedback">
                                                        <div
                                                        class="alert alert-dismissible fade show"
                                                        :class="{'alert-success': status == 200 || status == 201, 'alert-danger': status != 200  }"
                                                        role="alert">
                                                            {{ feedback }}
                                                            <button type="button" class="btn-close" @click="clearFeedbackAndStatus"></button>
                                                        </div>
                                                    </div>

                                                    <div class="alert alert-warning">When a staff is blocked, the staff will not be able to update his project status, and when logged out the staff won't be able to log in.</div>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                                    <button type="button" class="btn btn-danger" @click="blockUser(staff.email, user.id)">
                                                        <div v-if="!isBlocking">
                                                            Block
                                                        </div>
                                                        <div v-else>
                                                            <SmallLoadingSpinner />
                                                        </div>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div v-else>
                                <NothingToShow />
                            </div>
                        </div>

                    </div>
                </div>


                <!-- Invite to be admin modal -->
                <div class="modal fade" tabindex="-1"  id="inviteAdmin" aria-labelledby="inviteAdmin" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Enroll a new staff</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <label for="inviteeEmail">Staff email</label>
                            <input type="text" class="form-control" id="inviteeEmail" placeholder="johndoe@gmail.com">
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-success">Invite</button>
                        </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div v-else>
            <LoadingSpinner class="p-3"/>
        </div>
    </div>

</template>

<script setup>
import { useAdmin } from '@/store/useAdmin';
import { useUser } from '@/store/useUser';
import { storeToRefs } from 'pinia';
import { inject, ref } from 'vue';
import LoadingSpinner from '../LoadingSpinner.vue';
import NothingToShow from '../NothingToShow.vue';
import SmallLoadingSpinner from '../SmallLoadingSpinner.vue';

let userStore = useUser()
let adminStore = useAdmin()

let { user } = storeToRefs(userStore)
let { staff } = storeToRefs(adminStore)

let userEmail = inject('userEmail')

let isDataReady = ref(false)

async function getDataOnLoad() {
    if (!user.value ) {
        await userStore.getUserDetails(userEmail)
    }

    if (user.value.userType == 'admin') {
        await adminStore.getAllStaff(user.value.id)
    }
    
    isDataReady.value = true
}
getDataOnLoad()

let userDetails = ref(null)
let userDetailsOngoingProjects = ref(0)
let userDetailsFinisedProjects = ref(0)

async function viewUser(id) {
    let req = await fetch(`http://localhost:3000/api/admin/view-user-details?id=${id}`)
    let res = await req.json()

    userDetails.value = res.message

    // check finished and ongoing projects to display in view staff modal
    if (Array.isArray(res.message.projects)) {
        userDetailsOngoingProjects.value = (res.message.projects).filter(project => project.endDate == null)
        userDetailsFinisedProjects.value = (res.message.projects).filter(project => project.endDate != null)
    }
}

let isBlocking = ref(false)
let feedback = ref(null)
let status = ref(null)

async function blockUser(email, adminId) {
    isBlocking.value = true

    let req = await fetch('http://localhost:3000/api/admin/block-staff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email,
            adminId
        })
    })

    let res = await req.json()

    feedback.value = res.message
    status.value = req.status

    isBlocking.value = false
}

function clearFeedbackAndStatus() {
    feedback.value = status.value = null
}
</script>

<style scoped>
.admins{
    font-size: 28px;
}
</style>