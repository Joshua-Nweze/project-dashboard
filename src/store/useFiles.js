import { defineStore } from "pinia";
import files from "@/db/files"

export const useFiles = defineStore("files", {
    state: () => ({
        file: files,
        queryFiles: '',
        catArr: []
    }),

    actions: {
        getCat(){
            let arr = []
            for (const file of this.file.files) {
                arr.push(file.category)
            }
            this.catArr = new Set(arr)
            return this.catArr
        },

        getFileFromRoute(route){
            this.queryFiles = this.file.files.map(file => file)
                .filter(file => file.category.toLowerCase() == route)
        },

        searchFile(query){
            this.queryFiles = this.file.files.map(file => file)
                .filter(file => file.title.toLowerCase().includes(query.toLowerCase()))
        },

        sortCatArrAsc(){
            return Array.from(this.catArr).sort()
        },

        sortCatArrDsc(){
            return Array.from(this.catArr).sort().reverse()
        },

        sortqFilesAsc(){
            console.log(this.queryFiles.sort((a, b) => a - b))
            // console.log(this.queryFiles, typeof(this.queryFiles));
            // this.queryFiles.sort((a, b) => a.title - b.title)
            // console.log(this.queryFiles.sort((a, b) => a.title - b.title));
        },
    }
})