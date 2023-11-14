<template>
    <div>
        <div class="row">
            <div class="col-12 col-md-8">
                <ColOne />
            </div>

            <div class="col-12 col-md-4">
                <ColTwo />
            </div>
        </div>
    </div>
</template>

<script setup>
    import ColOne from "@/components/dashboard/ColOne.vue";
    import ColTwo from "@/components/dashboard/ColTwo.vue";
</script>

<style>
    .router-link{
        text-decoration: none;
    }
</style>