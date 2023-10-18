<template>
    <div>
        <div class="mx-md-5 px-md-5">
            <div>
                <h1 class="modal-title fs-5" id="editModalLabel">Edit account</h1>
            </div>
            <div class="mt-4">
                <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" class="form-control" id="name" >
                </div>
                <div class="mb-3">
                    <label for="phone" class="form-label">Phone number</label>
                    <input type="tel" class="form-control" id="phone" >
                </div>
                <div class="mb-3">
                    <label for="lga" class="form-label">LGA</label>
                    <input type="text" class="form-control" id="lga" >
                </div>
                
                <div class="mb-3">
                    <div
                        class="btn btn-outline-secondary"
                        data-bs-toggle="modal" 
                        data-bs-target="#changePwdModal"
                    >
                        Change password
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-end gap-2 mt-3">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
            </div>
        </div>
    </div>

    <!-- Change Pwd Modal -->
    <div class="modal fade" id="changePwdModal" tabindex="-1" aria-labelledby="changePwdModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="changePwdModalLabel">Change password</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="mb-3">
                <label for="current-password" class="form-label">Current password</label>
                <input type="password" class="form-control" id="current-password" >
            </div>
            <div class="mb-3">
                <label for="new-password" class="form-label">New password</label>
                <input type="password" class="form-control" id="new-password" >
            </div>
            <div class="mb-3">
                <label for="re-new-password" class="form-label">Enter new password again</label>
                <input type="password" class="form-control" id="re-new-password" >
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
        </div>
        </div>
    </div>
    </div>
</template>

<script setup>

</script>

<style scoped>

</style>