import express from 'express'
import userController from '../controllers/user.controller.js'

let { setupAccCheckMail, setupAccCheckPwd, setupAccDetails, getDetails, deleteAccount, editAcc, changePwd } = userController

let router = express.Router()

router.post('/check-email', setupAccCheckMail )
router.post('/check-password', setupAccCheckPwd)
router.post('/setup', setupAccDetails)
router.get('/get-details', getDetails)
router.delete('/delete-account', deleteAccount)
router.patch('/edit-account', editAcc)
router.patch('/change-password', changePwd)

export default router