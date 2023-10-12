<template>
    <div class="row justify-content-center">
        <div class="col-md-10 col-sm-12">
            <div class="admins">
                Staff
            </div>

            <button class="btn btn-secondary my-3" data-bs-toggle="modal" data-bs-target="#inviteAdmin"><i class="bi bi-person-add"></i> Enroll a new staff</button>

            <div class="row fw-bold">
                <div class="col">Full name</div>
                <div class="col d-none d-sm-block">Email</div>
                <div class="col d-none d-md-block">Date added</div>
                <div class="col">Action</div>
            </div>

            <div class="row my-3">
                <div class="col">Test name</div>
                <div class="col d-none d-sm-block">Test@mail.com</div>
                <div class="col d-none d-md-block">date</div>
                <div class="col flex">
                    <button type="button" class="mx-1 action-btn"><i class="bi bi-eye text-primary"></i></button>
                    <button type="button" class="mx-1 action-btn"><i class="bi bi-person-lock text-warning"></i></button>
                    <button type="button" class="mx-1 action-btn"><i class="bi bi-trash text-danger"></i></button>
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

</template>

<script setup>

</script>

<style scoped>
    .admins{
        font-size: 28px;
    }

    .action-btn{
        border: none;
        background: transparent;
    }
</style>