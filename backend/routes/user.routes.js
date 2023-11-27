import express from 'express'
import userController from '../controllers/user.controller.js'

let { getDetails, deleteAccount, editAcc, changePwd } = userController

let router = express.Router()

router.get('/get-details', getDetails)
router.delete('/delete-account', deleteAccount)
router.patch('/edit-account', editAcc)
router.patch('/change-password', changePwd)

export default router