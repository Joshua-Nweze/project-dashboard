import { defineStore } from "pinia";

export const useProjects = defineStore("project", {
    state: () => ({
        projects: [],
        ongoingProjects: [],
        finishedProjects: []
    }),

    actions: {
        async getStaffProjects(id) {
            let req = await fetch(`http://localhost:3000/api/projects/get-staff-projects?staffId=${id}`, { credentials: 'include' })
            let res = await req.json()
            
            this.projects = res.message
            this.ongoingProjects = (res.message).filter(project => project.endDate == null)
            this.finishedProjects = (res.message).filter(project => project.endDate != null)
        },

        async getAllProjects() {
            let req = await fetch(`http://localhost:3000/api/projects/get-all-projects`)
            let res = await req.json()
            
            this.projects = res.message
            this.ongoingProjects = (res.message).filter(project => project.endDate == null)
            this.finishedProjects = (res.message).filter(project => project.endDate != null)
        }
    }
})