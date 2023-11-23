import { defineStore } from "pinia";

export const useAdmin = defineStore("useAdmin", {
    state: () => ({
        staff: null,
        allProjects: [],
        allOngoingProjects: [],
        allFinishedProjects: []
    }),

    actions: {
        async getAllStaff (adminId) {
            let req = await fetch(`http://localhost:3000/api/admin/get-all-staff?adminId=${adminId}`, {
                credentials: 'include',
            })
            let res = await req.json()

            this.staff = res.message

            if (Array.isArray(this.staff)) {
                this.staff = (this.staff).reverse()
            }

            return {
                status: req.status
            }
        },

        async getAllProjects(id) {
            let req = await fetch(`http://localhost:3000/api/projects/get-all-projects?id=${id}`)
            let res = await req.json()
            
            this.allProjects = res.message

            if (Array.isArray(this.allProjects)) {
                this.allProjects = (this.allProjects).reverse()

                this.allOngoingProjects = (res.message).filter(project => project.endDate == null)
                this.allFinishedProjects = (res.message).filter(project => project.endDate != null)
            }

            return {
                status: req.status
            }
        },
    }
})