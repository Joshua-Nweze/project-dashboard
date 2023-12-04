<template>
  <div class="body">
    <div class="row container-fluid">
      <div class="col-2  d-none d-lg-block">
        <Sidenav class="side-nav"/>
      </div>

      <div class="col-lg-10 col-sm-12 col-md-12 main">
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
import {  storeToRefs } from "pinia"

import { useUser } from "@/store/useUser"

import { onMounted, provide, ref } from 'vue'
import { jwtDecode } from "jwt-decode"
import Cookies from "js-cookie";

let cookie = Cookies.get('token')
let decoded = jwtDecode(cookie)

let userStore = useUser()
let { user } =  storeToRefs(userStore)

provide('userEmail', decoded.id)
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
    position: relative;
    flex-grow: 1;
  }
</style>  