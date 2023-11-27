import express from 'express'
import SetupController from '../controllers/setup.controller.js'

let router = express.Router()

let { setupAccCheckMail, setupAccCheckPwd, setupAccDetails } = SetupController

router.post('/check-email', setupAccCheckMail )
router.post('/check-password', setupAccCheckPwd)
router.post('/setup', setupAccDetails)

export default router