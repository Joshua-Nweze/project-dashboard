<template>
    <div v-if="isDataReady" class="row justify-content-center">
        <div class="col-lg-6 col-sm-12 col-md-8">
            <div class="card">
                <div class="card-body">

                    <div v-if="feedback">
                        <div
                         class="alert alert-dismissible fade show"
                         :class="{'alert-success': status == 200 || status == 201, 'alert-danger': status != 200  }"
                         role="alert">
                            {{ feedback }}
                            <button type="button" class="btn-close" @click="clearFeedbackAndStatus"></button>
                        </div>
                    </div>

                    <div class="fs-3">Add a new project</div>
                    <hr>

                    <label class="mt-4" for="projectname">Project name</label>
                    <input
                     v-model="projectName" 
                     type="text" 
                     class="form-control" 
                     id="projectname"
                    >

                    <label class="mt-4" for="lga">LGA</label>
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
                    
                    <label class="mt-4" for="location">Location</label>
                    <input
                     v-model="location" 
                     type="text" 
                     class="form-control" 
                     id="location"
                    >

                    <label class="mt-4" for="description">Project description</label>
                    <textarea
                     v-model="description" 
                     type="text" 
                     class="form-control" 
                     id="description"
                    >
                    </textarea>

                    <div class="mt-4">Attach document ( image )</div>
                    <div class="attach-doc-div text-center " ref="dragArea" >
                        <div>
                            Select file <br>

                            <div class="d-flex justify-content-center mt-3">
                                <div class="input-group mb-3 " style="width: 80%">
                                    <input
                                     @change="handleFileChange" 
                                     type="file" 
                                     accept=".png, .jpg, .jpeg" 
                                     class="form-control" 
                                     ref="fileFromInput"
                                    >
                                </div>
                            </div>

                            <b ref="fileErrMsg"></b>

                        </div>
                    </div>

                    <div class="mt-5 bg-secondary upload text-center" @click="submit">
                        <div v-if="!loading">
                            Add project
                        </div>

                        <SmallLoadingSpinner v-else />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="m-5">
        <LoadingSpinner />
    </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { inject } from "vue";
import { useUser } from "@/store/useUser";
import { storeToRefs } from "pinia";
import { useProjects } from "@/store/useProjects";

import LoadingSpinner from "../LoadingSpinner.vue";
import SmallLoadingSpinner from "../SmallLoadingSpinner.vue";

import Cookies from "js-cookie";

let cookie = Cookies.get('token')

let userStore = useUser()
let { user } = storeToRefs(userStore)

let projectsStore = useProjects()

const userEmail = inject('userEmail')
const apihost = inject('apihost')
let isDataReady = ref(false)

async function getDataOnLoad() {
    if (!user.value ) {
        await userStore.getUserDetails(userEmail, cookie)

        if (user.value.userType == 'staff') {
            await projectsStore.getStaffProjects(user.value.id)
        }
    }

    isDataReady.value = true
}
getDataOnLoad()

let projectName = ref('')
let lga = ref('')
let location = ref('')
let description = ref('')
let image

let feedback = ref(null)
let status = ref(null)
let loading = ref(false)

function handleFileChange (event) {
    image = event.target.files[0];
}

function clearFeedbackAndStatus () {
    feedback.value = null;
    status.value = null;
}
async function submit() {
    if (!navigator.onLine) {
        feedback.value = 'Looks like you don\'t have an active internet connection'
        loading.value = false
        return
    }
    
    if (!user.value.id) {
        feedback.value = 'User not found'
        return
    }

    if (!projectName.value || !lga.value || !location.value || !description.value || !image) {
        feedback.value = 'All inputs are required'
        return
    }

    loading.value = true

    const formData = new FormData();

    formData.append('staff', user.value.id);
    formData.append('projectName', projectName.value);
    formData.append('lga', lga.value);
    formData.append('location', location.value);
    formData.append('description', description.value);
    formData.append('image', image);

    let req = await fetch(`${apihost}/api/projects/add`, {
        method: 'POST',
        body: formData
    })
    let res = await req.json()

    await projectsStore.getStaffProjects(user.value.id)

    loading.value = false

    status.value = req.status
    feedback.value = res.message
}

</script>

<style scoped>
    .attach-doc-div{
        border: 1px dashed;
        /* height: 100px; */
        width: inherit;
        border-radius: 7px;
        padding: 20px 0;
    }

    .upload{
        color: white;
        padding: 10px 0;
        border-radius: 7px;
    }
    .upload:hover{
        cursor: pointer;
    }
</style>