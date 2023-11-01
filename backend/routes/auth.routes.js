import express from 'express'
import authController from '../controllers/auth.controller.js'

let router = express.Router()
let { login, forgotPassword, resetPassword, validateOTP, logout, checkCokie } = authController

router.post('/login', login)
router.post('/forgot-password', forgotPassword)
router.post('/validate-opt', validateOTP)
router.patch('/reset-password', resetPassword)
router.get('/logout', logout)
// checking cookie
// remove later
router.get('/check', checkCokie)

export default router