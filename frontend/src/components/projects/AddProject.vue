<template>
    <div class="row justify-content-center">
        <div class="col-lg-6 col-sm-12 col-md-8">
            <div class="card">
                <div class="card-body">
                    <div class="fs-3">Add a new project</div>
                    <hr>

                    <label class="mt-4" for="projectname">Project name</label>
                    <input type="text" class="form-control" id="projectname">

                    <label class="mt-4" for="lga">LGA</label>
                    <input type="text" class="form-control" id="lga">

                    <label class="mt-4" for="description">Project description</label>
                    <textarea type="text" class="form-control" id="description"></textarea>

                    <div class="mt-4">Attach document ( image )</div>
                    <div class="attach-doc-div text-center " ref="dragArea" @dragover="dragOver" @dragleave="dragLeave" @drop="dragDrop">
                        <div ref="fileFeedback"></div>
                        <span><i class="bi bi-upload fs-1 text-secondary"></i> <br> Drag and drop here</span> <br>
                        <span>or</span> <br>
                        <div>
                            Select file <br>

                            <div class="d-flex justify-content-center mt-3">
                                <div class="input-group mb-3 " style="width: 80%">
                                    <input type="file" accept=".png, .jpg, .jpeg" @click="inputFile" class="form-control" ref="fileFromInput">
                                </div>
                            </div>

                            <b ref="fileErrMsg"></b>

                        </div>
                    </div>

                    <div class="mt-5 bg-secondary upload text-center" @click="a">
                        Add project
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
function a() {
    console.log(file.value, fileFromInput.value.value)
}
    import { ref } from "@vue/reactivity";

    let dragArea = ref(null)
    let fileFeedback = ref(null)
    let fileFromInput = ref(null)
    let fileErrMsg = ref(null)

    let file = ref(null)

    function dragOver(e){
        e.preventDefault()
        dragArea.value.classList.add('draggedOver')
    }

    function dragLeave(e){
        e.preventDefault()
        dragArea.value.classList.remove('draggedOver')
    }

    function dragDrop(e){
        e.preventDefault()

        let acceptFiles = ['image/jpeg', 'image/jpg', 'image/png']

        console.log(e.dataTransfer.files[0], fileFromInput.value)

        file.value = e.dataTransfer.files[0]

        if (fileFromInput.value.value) {
            file.value = fileFromInput.value.value

        } else {
            if (acceptFiles.includes(file.type)) {
                fileFeedback.value.innerHTML = file.name; 
                fileFeedback.value.style.color = '#212529bf'

            } else {
                fileFeedback.value.innerHTML = 'File extension not supported'; 
                fileFeedback.value.style.color = 'red'

                // fileFromInput.value.value = ''
                file.value = null

            }
        }
    }


    // function inputFile(e) {
    //     file = fileFromInput.value.value
    //     // if (file.name != null) {
    //     //     e.preventDefault()
    //     //     fileErrMsg.value.innerHTML = "File has been chosen already"
    //     //     fileErrMsg.value.style.color = "red"
    //     // }
    // }
    
</script>

<style scoped>
    .attach-doc-div{
        border: 1px dashed;
        /* height: 100px; */
        width: inherit;
        border-radius: 7px;
        padding: 20px 0;
    }

    .draggedOver{
        border: 1px solid;
    }

    .upload{
        color: white;
        padding: 10px 0;
        border-radius: 7px;
    }
    .upload:hover{
        cursor: pointer;
    }
</style>