<template>
    <div v-if="user.userType == 'staff'">
        <div class="">
            <RouterLink :to="`/project/${project._id}`" class="p-2 rounded bg-primary-subtle"><i class="bi bi-eye text-primary"></i></RouterLink>

            <span class="p-2 rounded bg-warning-subtle mx-1 hover-pointer" data-bs-toggle="modal" :data-bs-target="`#${editModalId}`">
                <i class="bi bi-pen text-warning"></i>
            </span>

            <span class="p-2 rounded bg-danger-subtle hover-pointer" data-bs-toggle="modal" :data-bs-target="`#${deleteModalId}`">
                <i class="bi bi-trash text-danger"></i>
            </span>
        </div>

        <!--Edit Modal -->
        <div class="modal fade" :id="editModalId" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="editeModalLabel">Edit project</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="clearFeedbackAndStatus"></button>
                    </div>
                
                    <div v-if="feedback" class="p-3">
                        <div
                            class="alert alert-dismissible fade show"
                            :class="{'alert-success': status == 200 || status == 201, 'alert-danger': status != 200  }"
                            role="alert">
                            {{ feedback }}
                            <button type="button" class="btn-close"  @click="clearFeedbackAndStatus"></button>
                        </div>
                    </div>

                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="project-name" class="form-label">Proejct name</label>
                            <input type="text" class="form-control" id="project-name" v-model="name" >
                        </div>

                        <div class="mb-3">
                            <label for="lga" class="form-label">LGA</label>
                            <div class="input-group mb-3">
                                <select name="lga" class="form-control" v-model="lga">
                                    <option value="">-- Select LGA --</option>
                                    <option value="Aninri">Aninri</option>
                                    <option value="Awgu">Awgu</option>
                                    <option value="Enugu East">Enugu East</option>
                                    <option value="Enugu North">Enugu North</option>
                                    <option value="Enugu South">Enugu South</option>
                                    <option value="Ezeagu">Ezeagu</option>
                                    <option value="Igbo Etiti">Igbo Etiti</option>
                                    <option value="Igbo Eze North">Igbo Eze North</option>
                                    <option value="Igbo Eze South">Igbo Eze South</option>
                                    <option value="Isi Uzo">Isi Uzo</option>
                                    <option value="Nkanu East">Nkanu East</option>
                                    <option value="Nkanu West">Nkanu West</option>
                                    <option value="Nsukka">Nsukka</option>
                                    <option value="Oji River">Oji River</option>
                                    <option value="Udenu">Udenu</option>
                                    <option value="Udi">Udi</option>
                                    <option value="Uzo-Uwani">Uzo-Uwani</option>
                                </select>
                            </div>
                        </div>

                        <div class="mb-3">
                            <label for="location" class="form-label">Location</label>
                            <input type="text" class="form-control" id="location" v-model="location">
                        </div>

                        <div class="mb-3">
                            <label for="desc" class="form-label">Description</label>
                            <textarea class="form-control" id="desc" v-model="description"></textarea>
                        </div>
                        
                        <div class="mb-3">
                            <label for="start-date" class="form-label">Start date</label>
                            <input type="date" class="form-control" id="start-date" v-model="formattedStartDate">
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" @click="editProject">
                            <div v-if="isEditing">
                                <SmallLoadingSpinner />
                            </div>
                            <div v-else>
                                Save changes
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!--Delete Modal -->
        <div class="modal fade" :id="deleteModalId" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="deleteModalLabel">Delete "{{ project.projectName }}" project</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-danger">
                        Are you sure you want to delete this project?
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary">Close</button>
                    <button
                     type="button" 
                     id="delbtn"
                     data-bs-dismiss="modal"
                     class="btn btn-danger" 
                     @click="async () => {
                        isDeleting = true
                        await projectsStore.deleteProject(project._id, user.id)
                        isDeleting = false
                        
                     }"
                    >
                        <span v-if="!isDeleting">
                            Delete
                        </span>
                        <SmallLoadingSpinner v-else/>
                    </button>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useUser } from '@/store/useUser';
import { useProjects } from '@/store/useProjects';
import { storeToRefs } from 'pinia';
import SmallLoadingSpinner from '../SmallLoadingSpinner.vue';
import { ref } from 'vue';

let userStore = useUser()
let { user } = storeToRefs(userStore)

let projectsStore = useProjects()

let props = defineProps(['user', 'project', 'editModalId', 'deleteModalId'])

let isDeleting = ref(false)

let name = ref(props.project.projectName)
let lga = ref(props.project.lga)
let location = ref(props.project.location)
let description = ref(props.project.description)
let startDate = new Date(props.project.startDate)

// formatting date
let day = (startDate.getUTCDate()).toString();
let month = (startDate.getUTCMonth() + 1).toString(); // Month is 0-based, so add 1
let year = startDate.getUTCFullYear();

month = month.padStart(2, 0)
day = day.padStart(2, 0)

// Create the formatted date string
let formattedStartDate = ref(`${year}-${month}-${day}`)

let feedback = ref('')
let status = ref('')
let isEditing = ref(false)

async function editProject() {
    isEditing.value = true
    feedback.value = status.value = ''

    let res = await projectsStore.editProject({
        id: (props.project._id),
        staffId: (user.value.id),
        projectName: (name.value),
        lga: (lga.value),
        location: (location.value),
        description: (description.value),
        startDate: (formattedStartDate.value)
    })
    console.log(res.res)
    feedback.value = res.res.message
    status.value = res.status

    isEditing.value = false

    projectsStore.getStaffProjects(user.value.id)

    setTimeout(() => {
        clearFeedbackAndStatus()
    }, 5000)
}

function clearFeedbackAndStatus() {
    feedback.value = status.value = ''
}
</script>

<style lang="scss" scoped>

</style>