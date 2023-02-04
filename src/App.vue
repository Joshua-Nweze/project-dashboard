<template>
  <div class="row container-fluid">
    <div class="col-2">
      <SidenavView />
    </div>

    
   <div class="col-10">
      <NavView />
      <router-view class="router-view"/>
      <Footer />
   </div>
  </div>
</template>

<script setup>
  import NavView from "@/views/NavView"
  import SidenavView from "@/views/SidenavView"
  import Footer from "@/components/Footer"
</script>

<style scoped>
  *{
    overflow-x: hidden;
  }

  .row>*{
    padding-left: 0;
    padding-right: 0;
  }

  .container-fluid, .container-lg, .container-md, .container-sm, .container-xl, .container-xxl {
    --bs-gutter-x: 1.5rem;
    --bs-gutter-y: 0;
    width: 100%;
    padding-right: 0;
    padding-left: 0;
    margin-right: 0;
    margin-left: 0;
  }

  .router-view{
    background-color: var(--bs-gray-100);
    padding: 30px;
  }
</style>