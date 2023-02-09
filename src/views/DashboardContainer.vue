<template>
  <div class="body">
    <div class="row container-fluid">
      <div class="col-2">
        <Sidenav class="side-nav"/>
      </div>

      
      <div class="col-10 main">
          <Nav />
          <div class="router-view p-4">
            <router-view/>
          </div>
          <Footer />
      </div>
    </div>

  </div>
</template>

<script setup>
  import Nav from "@/components/navbar/Nav"
  import Sidenav from "@/components/navbar/Sidenav"
  import Footer from "@/components/Footer"
  import { ref } from "@vue/reactivity"
</script>

<style scoped>
  *{
    overflow-x: hidden;
  }

  .body{
    background-color: var(--bs-gray-100);
  }

  .main{
    min-height: 100vh;
    display: flex;
    flex-flow: column;
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
    /* padding: 30px; */
    position: relative;
    /* margin-bottom: 30px; */
    flex-grow: 1;
  }
</style>  