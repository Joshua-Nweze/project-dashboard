import { defineStore } from "pinia";

export const useUser = defineStore("userStore", {
    state: () => ({
        user: null,
    }),

    actions: {
        async getUserDetails (email) {
            let req = await fetch(`http://localhost:3000/api/user/get-details?email=${email}`, { credentials: 'include' })
            let res = await req.json()

            this.user = res
            return this.user
        },
    }
})