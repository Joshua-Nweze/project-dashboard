import { defineStore } from "pinia";

export const useProjects = defineStore("project", {
    state: () => ({
        projects: [],
        ongoingProjects: [],
        finishedProjects: [],
        project: null
    }),

    actions: {
        async getStaffProjects(id) {
            let req = await fetch(`http://localhost:3000/api/projects/get-staff-projects?staffId=${id}`, { credentials: 'include' })
            let res = await req.json()
            
            this.projects = res.message

            if (Array.isArray(this.projects)) {
                this.projects = (this.projects).reverse()

                this.ongoingProjects = (res.message).filter(project => project.endDate == null)
                this.finishedProjects = (res.message).filter(project => project.endDate != null)
            }


            return {
                status: req.status
            }
        },

        async getProject(id) {
            let req = await fetch(`http://localhost:3000/api/projects/get?id=${id}`)
            let res = await req.json()

            this.project = res.message

            return { status: (req.status) }
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
        },

        async markProjectAsFinished(projectId, staffId) {
            let req = await fetch('http://localhost:3000/api/projects/mark-project-as-finished', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    project: projectId,
                    staff: staffId
                })
            })
        
            let res = await req.json()

            // updating project
            this.getProject(projectId)

            return { res: res, status: (req.status) }
        },

        async unmarkProjectAsFinished(projectId, staffId) {
            let req = await fetch('http://localhost:3000/api/projects/unmark-project-as-finished', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    project: projectId,
                    staff: staffId
                })
            })
        
            let res = await req.json()

            // updating project
            this.getProject(projectId)

            return { res: res, status: (req.status) }
        },

        async deleteMilestone(projectId, milestoneId, staffId) {
            let req = await fetch('http://localhost:3000/api/projects/delete-milestone', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    projectId,
                    milestoneId,
                    staffId
                })
            })

            let res = await req.json()

            // updating project
            this.getProject(projectId)

            return { res: res, status: (req.status) }
        }
    }
})