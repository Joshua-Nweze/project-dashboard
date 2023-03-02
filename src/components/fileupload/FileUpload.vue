<template>
    <div class="row justify-content-center">
        <div class="col-lg-6 col-sm-12 col-md-8">
            <div class="card">
                <div class="card-body">
                    <div class="fs-3">Upload file</div>
                    <hr>
                    <div>Select file category</div>
                    <select class="form-select" aria-label="Select category">
                        <option selected>-- Select categoty --</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>

                    <label class="mt-4" for="filename">File name</label>
                    <input type="text" class="form-control" id="filename">

                    <div class="mt-4">Attach document ( images and pdf file )</div>
                    <div class="attach-doc-div text-center " ref="dragArea" @dragover="dragOver" @dragleave="dragLeave" @drop="dragDrop">
                        <div ref="fileFeedback"></div>
                        <span><i class="bi bi-upload fs-1 text-secondary"></i> <br> Drag and drop here</span> <br>
                        <span>or</span> <br>
                        <div>
                            Select file <br>

                            <div class="d-flex justify-content-center mt-3">
                                <div class="input-group mb-3 " style="width: 80%">
                                    <input type="file" accept=".png, .jpg, .jpeg, .pdf" @click="inputFile" class="form-control" ref="file">
                                </div>
                            </div>

                            <b ref="fileErrMsg"></b>

                        </div>
                    </div>

                    <div class="mt-5 bg-secondary upload text-center">
                        Upload
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from "@vue/reactivity";

    let dragArea = ref(null)
    let fileFeedback = ref(null)
    let file = ref(null)
    let fileErrMsg = ref(null)

    let FILE = ref(null)
    
    function dragOver(e){
        e.preventDefault()
        

// if(!file.value){
//         console.log('file no dey');
//     } else{console.log('file dey');}

        dragArea.value.classList.add('draggedOver')
    }

    function dragLeave(e){
        e.preventDefault()
        dragArea.value.classList.remove('draggedOver')
    }

    function dragDrop(e){
        e.preventDefault()

        let acceptFiles = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf']

        FILE = e.dataTransfer.files[0]
        console.log();

        if (file.value.value != '') {
            fileFeedback.value.innerHTML = "File has been chosen already"
            fileFeedback.value.style.color = "#e4e413"
        } else {
            if (acceptFiles.includes(FILE.type)) {
                fileFeedback.value.innerHTML = FILE.name; 
                fileFeedback.value.style.color = '#212529bf'
            } else {
                fileFeedback.value.innerHTML = 'File extension not supported'; 
                fileFeedback.value.style.color = 'red'
            }
        }
    }


    function inputFile(e) {
        if (FILE.name != null) {
            console.log(FILE);
            e.preventDefault()
            fileErrMsg.value.innerHTML = "File has been chosen already"
            fileErrMsg.value.style.color = "#e4e413"
        }
    }
    
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