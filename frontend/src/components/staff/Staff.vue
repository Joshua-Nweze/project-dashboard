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
                                v-for="user in staff"
                                class="row my-3 align-items-center">
                                    <div class="col">{{ user.name }}</div>
                                    <div class="col d-none d-sm-block">{{ user.email }}</div>
                                    <div class="col d-none d-md-block">{{ new Date(user.createdAt).toDateString() }}</div>
                                    <div class="col">
                                        <button type="button" class="btn bg-primary-subtle" data-bs-toggle="modal" data-bs-target="#view"><i class="bi bi-eye text-primary"></i></button>
                                        <button type="button" class="mx-1 btn bg-warning-subtle" data-bs-toggle="modal" data-bs-target="#block"><i class="bi bi-person-lock text-warning"></i></button>
                                        <!-- <button type="button" class="btn bg-danger-subtle"><i class="bi bi-trash text-danger"></i></button> -->
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
                            <input type="text" class="form-control" id="inviteeEmail" placeholder="jogndoe@gmail.com">
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-success">Invite</button>
                        </div>
                        </div>
                    </div>
                </div>

                <!-- View user modal -->
                <div class="modal fade" tabindex="-1"  id="view" aria-labelledby="view" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Staff Name</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div>LGA</div>
                                <div>Phone</div>
                                <div>Email</div>
                                <div>No of projects</div>
                                <div>Projects completed</div>
                                <div>Ongoing projects</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Block modal -->
                <div class="modal fade" tabindex="-1"  id="block" aria-labelledby="block" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Block staff name</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="alert alert-warning">When a staff is blocked, the staff will not be able to update his project status, and when logged out the staff won't be able to log in.</div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="button" class="btn btn-danger">Block</button>
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
</script>

<style scoped>
.admins{
    font-size: 28px;
}
</style>