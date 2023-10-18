<template>
    <div class="">
        <div class="row px-md-2">
            <Searchbar 
                placeholder="Search project"
            />
        </div>

        <div class="row flex justify-content-center gap-2 px-md-2">
             <div class="card col-sm-12 col-md-3 col-lg-4 col-4 px-0" style="width: 16rem;">
                <div class="position-relative">
                    <img src="https://th.bing.com/th/id/R.4fc19ffef5673aa302e77749e8f30223?rik=26FrHb0EBiSNyw&pid=ImgRaw&r=0" class="card-img-top px-0" alt="">
                    <!-- Only for staff -->
                    <div class="position-absolute top-0 end-0 p-2">
                        <ProjectActionBtns />
                    </div>
                    <!--  -->
                </div>
                <div class="card-body px-2">
                    <h5 class="card-title col">Card title</h5>

                    <p class="card-text mt-2">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <RouterLink to="/project/id" class="btn btn-primary">See more</RouterLink>
                </div>
            </div>

        </div>

       
    </div>
</template>

<script setup>
import Searchbar from '@/components/Searchbar.vue';
import ProjectActionBtns from '@/components/projects/ProjectActionBtns.vue';
</script>

<style lang="scss" scoped>

</style>