<template>
    <div>
        <div class="">
            <RouterLink to="/project/id" class="p-2 rounded bg-primary-subtle"><i class="bi bi-eye text-primary"></i></RouterLink>

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
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="project-name" class="form-label">Proejct name</label>
                        <input type="text" class="form-control" id="project-name" placeholder="">
                    </div>

                    <div class="mb-3">
                        <label for="lga" class="form-label">LGA</label>
                        <input type="text" class="form-control" id="lga" placeholder="">
                    </div>

                    <div class="mb-3">
                        <label for="location" class="form-label">Location</label>
                        <input type="text" class="form-control" id="location" placeholder="">
                    </div>

                    <div class="mb-3">
                        <label for="desc" class="form-label">Description</label>
                        <textarea class="form-control" id="desc" placeholder=""></textarea>
                    </div>
                    
                    <div class="mb-3">
                        <label for="start-date" class="form-label">Start date</label>
                        <input type="date" class="form-control" id="start-date" placeholder="">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
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
                    <button type="button" class="btn btn-danger">Delete</button>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>