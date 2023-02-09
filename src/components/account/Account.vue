<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div class="card">
                <div class="card-body">
                    <div class="fs-3 mb-4"><i class="bi bi-person-circle"></i> My profile</div>
                    <EditProfile />
                    <ChangePwd />
                    <hr>
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