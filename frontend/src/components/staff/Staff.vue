<template>
    <div>
        <div v-if="error">
            <ErrorReload />
        </div>
        <div v-else>
            <div v-if="isDataReady">
                <div v-if="user.userType == 'admin'">
                    <div class="row justify-content-center">
                        <div class="col-md-10 col-sm-12">
                            <div class="admins">
                                Staff
                            </div>

                            <button class="btn btn-secondary my-3" data-bs-toggle="modal" data-bs-target="#inviteAdmin"><i
                                    class="bi bi-person-add"></i> Enroll a new staff</button>

                            <div>
                                <div v-if="(typeof staff == 'object' || typeof staff == 'array')">
                                    <div class="row fw-bold">
                                        <div class="col">Full name</div>
                                        <div class="col d-none d-sm-block">Email</div>
                                        <div class="col d-none d-md-block">Date registered</div>
                                        <div class="col ">Action</div>
                                    </div>

                                    <div v-for="(staffDetail, index) in staff" :key="index"
                                        class="row my-3 align-items-center">
                                        <div class="col text-break">{{ staffDetail.user.name }}</div>
                                        <div class="col d-none d-sm-block text-break">{{ staffDetail.user.email }}</div>
                                        <div class="col d-none d-md-block">{{ new
                                            Date(staffDetail.user.createdAt).toDateString() }}</div>
                                        <div class="col">

                                            <button @click="viewUser(staffDetail.user._id)" type="button"
                                                class="btn bg-primary-subtle" data-bs-toggle="modal"
                                                :data-bs-target="`#view_${index}`">
                                                <i class="bi bi-eye text-primary"></i>
                                            </button>

                                            <span>
                                                <button v-if="!staffDetail.isUserBlocked" type="button"
                                                    class="mx-1 btn bg-warning-subtle" data-bs-toggle="modal"
                                                    :data-bs-target="`#block_${index}`">
                                                    <i class="bi bi-person-lock text-warning"></i>
                                                </button>

                                                <button v-if="staffDetail.isUserBlocked" type="button"
                                                    class="mx-1 btn bg-success-subtle" data-bs-toggle="modal"
                                                    :data-bs-target="`#unblock_${index}`">
                                                    <i class="bi bi-person-check text-success"></i>
                                                </button>
                                            </span>
                                        </div>

                                        <!-- View user modal -->
                                        <div class="modal fade" tabindex="-1" :id="`view_${index}`" aria-labelledby="view"
                                            aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div v-if="userDetails">
                                                        <div class="modal-header">
                                                            <h5 class="modal-title">{{ userDetails.user.name }}</h5>
                                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                                aria-label="Close"></button>
                                                        </div>
                                                        <div class="modal-body">
                                                            <div><span class="fw-bold">LGA:</span> {{ userDetails.user.lga
                                                            }}</div>
                                                            <div><span class="fw-bold">Phone:</span> {{
                                                                userDetails.user.phoneNumber }}</div>
                                                            <div><span class="fw-bold">Email:</span> {{
                                                                userDetails.user.email }}</div>
                                                            <div><span class="fw-bold">Total number of projects:</span> {{
                                                                typeof userDetails.projects == 'object' || typeof
                                                                userDetails.projects == 'array' ?
                                                                userDetails.projects.length : 0 }}</div>
                                                            <div><span class="fw-bold">Projects completed:</span> {{
                                                                userDetailsFinisedProjects.length }}</div>
                                                            <div><span class="fw-bold">Ongoing projects:</span> {{
                                                                userDetailsOngoingProjects.length }}</div>
                                                        </div>
                                                    </div>

                                                    <div v-else>
                                                        <LoadingSpinner class="m-5 p-5" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Block modal -->
                                        <div class="modal fade" tabindex="-1" :id="`block_${index}`" aria-labelledby="block"
                                            aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title">Block {{ staffDetail.user.name }}</h5>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                            aria-label="Close" @click="clearFeedbackAndStatus"></button>
                                                    </div>
                                                    <div class="modal-body">

                                                        <div v-if="feedback">
                                                            <div class="alert alert-dismissible fade show"
                                                                :class="{ 'alert-success': status == 200 || status == 201, 'alert-danger': status != 200 }"
                                                                role="alert">
                                                                {{ feedback }}
                                                                <button type="button" class="btn-close"
                                                                    @click="clearFeedbackAndStatus"></button>
                                                            </div>
                                                        </div>

                                                        <div class="alert alert-warning">When a staff is blocked, the staff
                                                            can no longer log in when logged out.</div>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary"
                                                            data-bs-dismiss="modal">Cancel</button>
                                                        <button type="button" class="btn btn-danger"
                                                            @click="blockUser(staffDetail.user.email, user.id)">
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

                                        <!-- Unblock modal -->
                                        <div class="modal fade" tabindex="-1" :id="`unblock_${index}`"
                                            aria-labelledby="block" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title">Unblock {{ staffDetail.user.name }}</h5>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                            aria-label="Close" @click="clearFeedbackAndStatus"></button>
                                                    </div>
                                                    <div class="modal-body">

                                                        <div v-if="feedback">
                                                            <div class="alert alert-dismissible fade show"
                                                                :class="{ 'alert-success': status == 200 || status == 201, 'alert-danger': status != 200 }"
                                                                role="alert">
                                                                {{ feedback }}
                                                                <button type="button" class="btn-close"
                                                                    @click="clearFeedbackAndStatus"></button>
                                                            </div>
                                                        </div>

                                                        <div class="alert alert-warning">When a staff is unblocked,the staff
                                                            can log in whenever.</div>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary"
                                                            data-bs-dismiss="modal">Cancel</button>
                                                        <button type="button" class="btn btn-success"
                                                            @click="unblockUser(staffDetail.user.email, user.id)">
                                                            <div v-if="!isUnblocking">
                                                                Unblock
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
                    <div class="modal fade" tabindex="-1" id="inviteAdmin" aria-labelledby="inviteAdmin" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Enroll a new staff</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div class="modal-body">

                                    <div v-if="inviteFeedback" class="alert alert-dismissible fade show"
                                        :class="[inviteStatus == 200 ? 'alert-success' : 'alert-danger']" role="alert">
                                        {{ inviteFeedback }}
                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"
                                            @click="inviteFeedback = inviteStatus = null"></button>
                                    </div>

                                    <label for="inviteeEmail">Staff email</label>
                                    <input type="text" class="form-control" id="inviteeEmail"
                                        placeholder="johndoe@gmail.com" v-model="inviteeEmail">
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                                    <button type="button" class="btn btn-success" @click="inviteStaff">
                                        <span v-if="!isInviting">Invite</span>
                                        <SmallLoadingSpinner v-else />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div v-else>
                <LoadingSpinner class="p-3" />
            </div>
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
import ErrorReload from '../ErrorReload.vue'

let userStore = useUser()
let adminStore = useAdmin()

let { user } = storeToRefs(userStore)
let { staff } = storeToRefs(adminStore)

let userEmail = inject('userEmail')
let apihost = inject('apihost')

let isDataReady = ref(true)
let error = ref(false)

async function getDataOnLoad() {
    if (!user.value) {
        isDataReady.value = false

        let req = await userStore.getUserDetails(userEmail)

        if (req.status == 500) {
            error.value = true
            return
        }

        if (user.value.userType == 'admin') {
            let req = await adminStore.getAllStaff(user.value.id)

            await adminStore.getUnansweredInvites(user.value.id)
            await adminStore.getAllProjects(user.value.id)

            if (req.status == 500) {
                error.value = true
                return
            }
        }
    }

    isDataReady.value = true
}
getDataOnLoad()

let userDetails = ref(null)
let userDetailsOngoingProjects = ref(0)
let userDetailsFinisedProjects = ref(0)


async function viewUser(id) {
    userDetails.value = null

    let req = await fetch(`${apihost}/api/admin/view-user-details?id=${id}`)
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

    let req = await fetch(`${apihost}/api/admin/block-staff`, {
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

    setTimeout(() => {
        clearFeedbackAndStatus()
    }, 5000)

    await adminStore.getAllStaff(user.value.id)
}

let isUnblocking = ref(false)

async function unblockUser(email, adminId) {
    isUnblocking.value = true

    let req = await fetch(`${apihost}/api/admin/unblock-staff`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email,
            adminId
        })
    })

    let res = await req.json()

    feedback.value = res.message
    status.value = req.status

    isUnblocking.value = false

    setTimeout(() => {
        clearFeedbackAndStatus()
    }, 5000)

    await adminStore.getAllStaff(user.value.id)
}

function clearFeedbackAndStatus() {
    feedback.value = status.value = null
}

let inviteeEmail = ref('')
let isInviting = ref(false)
let inviteFeedback = ref(null)
let inviteStatus = ref(null)

async function inviteStaff() {
    isInviting.value = true
    inviteFeedback.value = inviteStatus.value = null

    let req = await fetch(`${apihost}/api/admin/invite-staff`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
            adminId: user.value.id,
            email: inviteeEmail.value
        })
    })

    let res = await req.json()

    isInviting.value = false
    inviteStatus.value = req.status
    inviteFeedback.value = res.message
    inviteeEmail.value = ''

    setTimeout(() => {
        inviteFeedback.value = inviteStatus.value = null
    }, 5000)
}
</script>

<style scoped>.admins {
    font-size: 28px;
}</style>