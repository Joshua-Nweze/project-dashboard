import express from 'express'
import adminController from '../controllers/admin.controller.js'

let { inviteStaff, blockStaff, unblockStaff, getBlockedStaff, getAllStaff, createAdminAcc, viewUser, isUserBlocked } = adminController

let router = express.Router()

router.post('/invite-staff', inviteStaff)
router.post('/block-staff', blockStaff)
router.delete('/unblock-staff', unblockStaff)
router.get('/get-blocked-staff', getBlockedStaff)
router.get('/get-all-staff', getAllStaff)
router.post('/create-admin', createAdminAcc)
router.get('/view-user-details', viewUser)
router.get('/is-user-blocked', isUserBlocked)

export default router