<template>
    <div class="row justify-content-center">
        <div class="col-md-8 col-sm-12">
            <div class="card">
                <div class="card-body">
                    <div class="fs-3 mb-4"><i class="bi bi-person-circle"></i> My profile</div>
                    <EditProfile />
                    <ChangePwd />
                    <hr>
                    <!-- DeleteAccount shoukdn't be available for super admin -->
                    <DeleteAccount />
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

</style>