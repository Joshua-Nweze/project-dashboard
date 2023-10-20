import express from 'express'
import userController from '../controllers/user.controller.js'

let { setupAccCheckMail, setupAccCheckPwd, setupAccDetails } = userController

let router = express.Router()

router.post('/check-email', setupAccCheckMail )
router.post('/check-password', setupAccCheckPwd)
router.post('/setup', setupAccDetails)

export default router