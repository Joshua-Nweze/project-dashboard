import Cookies from "js-cookie";
import { defineStore } from "pinia";
const apihost = process.env.VUE_APP_API_HOST || 'https://project-dashboard-n7sx.onrender.com'

export const useUser = defineStore("userStore", {
    state: () => ({
        user: null,
    }),

    actions: {
        async getUserDetails (email, token) {
            let req = await fetch(`${apihost}/api/user/get-details?email=${email}`, { credentials: 'include',
            headers: { 'Authorization': `Bearer ${token}` }
        })
            let res = await req.json()

            this.user = res
            
            return {
                message: res,
                status: req.status
            }
        },

        async editAccount(name, phoneNumber, lga, id, email, token) {
            let req = await fetch(`${apihost}/api/user/edit-account`, {
                credentials: 'include',
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name, phoneNumber, lga, id
                })
            })

            let res = await req.json()

            if (req.status == 200) {
                // fetch updated user details
                this.getUserDetails(email, token)
            }

            return {
                message: res.message,
                status: req.status
            }
        },

        async changePassword(id, password, new_password, re_new_password, token) {
            let req = await fetch(`${apihost}/api/user/change-password`, {
                credentials: 'include',
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    id, password, new_password, re_new_password
                })
            })

            let res = await req.json()

            return {
                message: res.message,
                status: req.status
            }
        }
    }
})