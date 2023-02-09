<template>
    <div class="row justify-content-center">
        <div class="col-10">
            <div class="admins">
                Admins
            </div>

            <button class="btn btn-secondary m-3" data-bs-toggle="modal" data-bs-target="#inviteAdmin">Invite someone to be admin</button>

            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Full name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Date added</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="align-middle">Test name</td>
                        <td class="align-middle">Test@mail.com</td>
                        <td class="align-middle">date</td>
                        <td class="align-middle"><button type="button" class="btn btn-danger">Remove</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>


    <!-- Invite to be admin modal -->
    <div class="modal fade" tabindex="-1"  id="inviteAdmin" aria-labelledby="inviteAdmin" aria-hidden="true" data-bs-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Invite to be admin</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <label for="inviteeEmail">Enter invitee's email</label>
                <input type="text" class="form-control" id="inviteeEmail" placeholder="Invitee's e-mail">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-secondary">Invite</button>
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
</style>