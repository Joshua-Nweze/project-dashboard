<template>
    <div class="row justify-content-center">
        <div class="col-10">
            <div class="admins">
                Admins
            </div>

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
</template>

<script setup>

</script>

<style scoped>
    .admins{
        font-size: 28px;
    }
</style>