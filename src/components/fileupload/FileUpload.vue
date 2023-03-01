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

                    <div class="mt-4">Attach document</div>
                    <div class="attach-doc-div text-center " ref="dragArea" @dragover="dragOver" @dragleave="dragLeave" @drop="dragDrop">
                        <div ref="fileFeedback"></div>
                        <span><i class="bi bi-upload fs-1 text-secondary"></i> <br> Drag and drop here</span> <br>
                        <span>or</span> <br>
                        <div>
                            Select file <br>

                            <div class="d-flex justify-content-center mt-3">
                                <div class="input-group mb-3 " style="width: 80%">
                                    <input type="file" class="form-control" id="inputGroupFile02">
                                </div>
                            </div>
                            
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

        let acceptedFiles = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf']

        const FILE = e.dataTransfer.files[0]
        // console.log(FILE.type, FILE.name);

        

        if (acceptedFiles.includes(FILE.type)) {
            fileFeedback.value.innerHTML = FILE.name; 
            fileFeedback.value.style.color = '#212529bf'
        } else {
            fileFeedback.value.innerHTML = 'File extension not supported'; 
            fileFeedback.value.style.color = 'red'
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