<template>
    <CardsRow />
    <LatestRow />
    <GraphRow />
</template>

<script setup>
    import CardsRow from "@/components/dashboard/CardsRow"
    import LatestRow from "@/components/dashboard/LatestRow"
    import GraphRow from "@/components/dashboard/GraphRow"
</script>

<style>
    .router-link{
        text-decoration: none;
    }
</style>