import express from 'express'
import adminController from '../controllers/admin.controller.js'

let { inviteStaff } = adminController

let router = express.Router()

router.post('/invite-staff', inviteStaff)

export default router