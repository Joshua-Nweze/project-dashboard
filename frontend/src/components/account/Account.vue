<template>
    <div class="container emp-profile">
        <div class="row">
            <div class="col-md-6 offset-md-3">
                <div class="profile-head row mb-3">
                    <div class="col">
                        <h5>
                        Kshiti Ghelani
                        </h5>
                        <h6>
                            Admin
                        </h6>
                    </div>
                    <div class="col">
                        <div class="d-flex justify-content-end">
                            <RouterLink to="/edit-account" class="btn btn-outline-secondary">Edit</RouterLink>
                        </div>
                    </div>
                </div>

                
                <div class="md-offset-3 col-md-8">
                    <div class=""> 
                        <strong>User Id</strong>
                        <span> Kshiti123</span>
                    </div>
                    
                    <div class=""> 
                        <strong>Email</strong>
                        <span> Kshiti123</span>
                    </div>
                    
                    <div class=""> 
                        <strong>Phone</strong>
                        <span> Kshiti123</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import EditProfile from "@/components/account/EditProfile"
    import ChangePwd from "@/components/account/ChangePwd"
    import DeleteAccount from "@/components/account/DeleteAccount"
</script>

<style scoped>
.emp-profile{
    padding: 3%;
    margin-top: 3%;
    margin-bottom: 3%;
    border-radius: 0.5rem;
}

.profile-head h5{
    color: #333;
}
.profile-head h6{
    color: #0062cc;
}

.profile-head{
    font-weight:600;
    border: none;
}
.profile-head{
    border: none;
    border-bottom:2px solid #4a535d;
}
</style>