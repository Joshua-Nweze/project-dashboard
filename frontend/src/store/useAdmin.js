import { defineStore } from "pinia";

export const useAdmin = defineStore("useAdmin", {
    state: () => ({
        staff: null,
    }),

    actions: {
        async getAllStaff () {
            let req = await fetch('http://localhost:3000/api/admin/get-all-staff', { credentials: 'include' })
            let res = await req.json()

            this.staff = res.message

            if (Array.isArray(this.staff)) {
                this.staff = (this.staff).reverse()
            }
        }
    }
})