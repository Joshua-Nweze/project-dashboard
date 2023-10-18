import { defineStore } from "pinia";
import users from "@/db/users"

export const useUsers = defineStore("users", {
    state: () => ({
        user: users,
    })
})