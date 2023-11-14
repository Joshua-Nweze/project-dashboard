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

            if (Array.isArray(this.projects)) {
                this.projects = (this.projects).reverse()
            }

            if (typeof this.projects == 'array') {
                this.ongoingProjects = (this.projects).filter(project => project.endDate == null)
                this.finishedProjects = (res.message).filter(project => project.endDate != null)
            }
        },

        async getAllProjects() {
            let req = await fetch(`http://localhost:3000/api/projects/get-all-projects`)
            let res = await req.json()
            
            this.projects = res.message
            
            if (Array.isArray(this.projects)) {
                this.projects = (this.projects).reverse()
            }

            if (typeof this.projects == 'array') {
                this.ongoingProjects = (res.message).filter(project => project.endDate == null)
                this.finishedProjects = (res.message).filter(project => project.endDate != null)
            }
        },

        async getProject(id) {
            let req = await fetch(`http://localhost:3000/api/projects/get?id=${id}`)
            let res = await req.json()

            return res
        },

        async deleteProject(id, staffId) {
            let req = await fetch(`http://localhost:3000/api/projects/delete-project`, {
                method: 'DELETE',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    id,
                    staffId
                })
            })
            let res = await req.json()

            // updating projects
            this.getStaffProjects(staffId)
        },

        async editProject({id, staffId, projectName, lga, location, description, startDate}) {
            let req = await fetch(`http://localhost:3000/api/projects/edit-project`, {
                method: 'PATCH',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    id,
                    staffId,
                    projectName, 
                    lga, 
                    location, 
                    description, 
                    startDate
                })
            })
            let res = await req.json()

            return { res: res, status: (req.status) }
        }
    }
})