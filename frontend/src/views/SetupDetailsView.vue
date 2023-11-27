<template>
    <div class="row justify-content-center">
        <div class="col-lg-6 col-xl-4 col-md-8 col-sm-10">
            <div class="card border-0">
                <div class="card-body">

                    <Header title="Enter your details" />

                    <div class="input-group mb-3">
                        <input type="text" @keypress.enter="login" class="form-control" placeholder="Full Name" aria-label="E-mail" aria-describedby="basic-addon1" v-model="name">
                    </div>
                    <div class="input-group mb-3">
                        <select name="cars" id="cars" class="form-control">
                            <option>-- Select LGA --</option>
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
                    <div class="input-group mb-3">
                        <input type="tel" @keypress.enter="login" class="form-control" placeholder="Phone" aria-label="E-mail" aria-describedby="basic-addon1" v-model="phoneNumber">
                    </div>

                    <div class="d-flex justify-content-end">
                        <!-- <router-link to="/dashboard"> -->
                            <button class="btn btn-secondary" @click="login">Create account</button>
                        <!-- </router-link> -->
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Header from '@/components/auth/Header.vue';
</script>

<style scoped>
*{
    overflow-x: hidden;
}

.row{
    /* Hide scrollbar for IE, Edge add Firefox */
    -ms-overflow-style: none;
    scrollbar-width: none; /* Firefox */

    --bs-gutter-x: 0;
    --bs-gutter-y: 0
}
.row::-webkit-scrollbar {
    display: none;
}

.forgot-pwd{
    font-size: 12px;
}

.form-control:focus{
    border-color: #6c757d;
    box-shadow: none;
}

.row{
    margin-top: 80px;
}
</style>