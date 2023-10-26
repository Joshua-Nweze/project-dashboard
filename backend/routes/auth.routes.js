import express from 'express'
import authController from '../controllers/auth.controller.js'

let router = express.Router()
let { login, forgotPassword, resetPassword, validateOTP } = authController

router.post('/login', login)
router.post('/forgot-password', forgotPassword)
router.post('/validate-opt', validateOTP)
router.patch('/reset-password', resetPassword)

export default router