<template>
    <div v-if="user.userType == 'staff'">
        <div class="">
            <RouterLink :to="`/project/${project._id}`" class="p-2 rounded bg-primary-subtle"><i class="bi bi-eye text-primary"></i></RouterLink>

            <span class="p-2 rounded bg-warning-subtle mx-1 hover-pointer" data-bs-toggle="modal" data-bs-target="#editModal">
                <i class="bi bi-pen text-warning"></i>
            </span>

            <span class="p-2 rounded bg-danger-subtle hover-pointer" data-bs-toggle="modal" data-bs-target="#deleteModal">
                <i class="bi bi-trash text-danger"></i>
            </span>
        </div>

        <!--Edit Modal -->
        <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="editeModalLabel">Edit project</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                
            <div v-if="feedback" class="p-3">
                <div
                    class="alert alert-dismissible fade show"
                    :class="{'alert-success': status == 200 || status == 201, 'alert-danger': status != 200  }"
                    role="alert">
                    {{ feedback }}
                    <button type="button" class="btn-close" @click="( feedback = status = '' )"></button>
                </div>
            </div>

                <div class="modal-body">
                    <div class="mb-3">
                        <label for="project-name" class="form-label">Proejct name</label>
                        <input type="text" class="form-control" id="project-name" v-model="name">
                    </div>

                    <div class="mb-3">
                        <label for="lga" class="form-label">LGA</label>
                        <input type="text" class="form-control" id="lga" v-model="lga">
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
                <!-- ADD LOADER WHEN UPDATING -->
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

        <!--Edit Modal -->
        <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="deleteModalLabel">Delete project</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-danger">
                        Are you sure you want to delete this project?
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button
                     type="button" 
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

let props = defineProps(['user', 'project'])

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
console.log(startDate.value, formattedStartDate.value)

let feedback = ref('')
let status = ref('')
let isEditing = ref(false)

async function editProject() {
    isEditing.value = true
    feedback.value = status.value = ''

    let res = await projectsStore.editProject(
        (props.project._id),
        (user.value.id),
        (name.value),
        (lga.value),
        (location.value),
        (description.value),
        (formattedStartDate.value)
    )
    console.log(res.res)
    feedback.value = res.res.message
    status.value = res.status

    isEditing.value = false
}
</script>

<style lang="scss" scoped>

</style>