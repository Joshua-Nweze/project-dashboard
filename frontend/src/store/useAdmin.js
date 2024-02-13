import { defineStore } from "pinia";
let apihost = 'https://lime-real-tuna.cyclic.app'

export const useAdmin = defineStore("useAdmin", {
    state: () => ({
        staff: null,
        allProjects: [],
        allOngoingProjects: [],
        allFinishedProjects: [],
        unansweredInvites: null
    }),

    actions: {
        async getAllStaff (adminId) {
            let req = await fetch(`${apihost}/api/admin/get-all-staff?adminId=${adminId}`, {
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
            let req = await fetch(`${apihost}/api/projects/get-all-projects?id=${id}`)
            let res = await req.json()
            
            this.allProjects = res.message

            if (Array.isArray(this.allProjects)) {
                this.allProjects = (this.allProjects).reverse()

                this.allOngoingProjects = (res.message).filter(project => project.endDate == null)
                this.allFinishedProjects = (res.message).filter(project => project.endDate != null)
            }

            this.getAllStaff(id)
            this.getUnansweredInvites(id)

            return {
                status: req.status
            }
        },

        async getUnansweredInvites(id){
            let req = await fetch(`${apihost}/api/admin/get-unanswered-invites?id=${id}`)
            let res = await req.json()

            this.unansweredInvites = res.message
        },

        async cancelInvite (id, email) {
            let req = await fetch(`${apihost}/api/admin/cancel-invite`, {
                method: 'DELETE',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({
                    id,
                    email
                })
            })

            this.getUnansweredInvites(id)
        }
    }
})