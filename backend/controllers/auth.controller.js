import Users from "../model/user.model.js"
import BlockedUsers from "../model/blockedUsers.model.js"
import OTP from "../model/otp.model.js"

import generateOTP from "../utils/generateOtp.js"
import nodemailer from "nodemailer"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from "dotenv"

dotenv.config()

// create web token
function createToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: 2 * 24 * 60 * 60 /* 2 days in seconds */
    })
}

async function login(req, res) {
    try {
        let { email, password } = req.body

        if(!email || !password) {
            res.status(400).json({ message: 'All inputs are required' })
            return
        }

        let isBlocked = await BlockedUsers.findOne({ email })

        if (isBlocked) {
            res.status(403).json({ message: 'Your account has been temporarily blocked, contact the admin at admin@gmail.com to rectify this' })
            return
        }

        let user = await Users.findOne({ email })

        if (!user) {
            res.status(401).json({ message: 'Incorrect email or password' })
            return
        }

        const isPwdTrue = await bcrypt.compare(password, user.password)

        if (isPwdTrue) {
            const token = createToken(email)

            // NOTE: add secure: true before production
            res.cookie('token', token, { maxAge: 172800000 /* 2 days in milliseconds */})
            res.status(200).json({ message: 'Login successful', token })
            return
        } else {
            res.status(401).json({ message: 'Incorrect email or password' })
            return
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Something went wrong, try again later' })
    }
}

async function forgotPassword(req, res) {
    try {
        const { email } = req.body

        let user = await Users.findOne({ email })
        let isBlocked = await BlockedUsers.findOne({ email })

        if(!email){
            res.status(400).json({ message: 'Inout is required' })
            return
        }

        if(!user){
            res.status(404).json({ message: 'Account with email does not exist' })
            return
        }

        if(isBlocked){
            res.status(404).json({ message: 'Your account was suspended, contact the admin at admin@gmail.com to rectify this' })
            return
        }

        // the generateOtp function lets an argument for the desired number of length
        // for the OTP
        let otpValue = generateOTP(4)

        bcrypt.hash(otpValue, 10)
            .then(async (hashedOtp) => {
                let doesOTPExist = await OTP.findOne({email})

                if (doesOTPExist) {
                    let { expiresAt } = doesOTPExist

                    if (expiresAt < Date.now()) {
                        OTP.deleteOne({email})
                    } else {
                        // if user still has valid OTP in db
                        // res.status(409).json({ message: 'Seems like we sent you an OTP already, check your email' })
                        // return

                        // go ahead and delete existing record if user request for OTP again
                        OTP.deleteOne({email})
                    }
                }

                    OTP.deleteOne({email})
                        .then(() => {
                            let newOTP = new OTP({
                                email,
                                OTP: hashedOtp,
                                createdAt: Date.now(),
                                expiresAt: Date.now() + 900000 // 15 mins
                             })

                        newOTP.save()
                            .then(() =>  {
                                //sending otp to user
                                let mailOptions = {
                                    from: 'jnweze2@gmail.com',
                                    to: email,
                                    subject: 'Reset password OTP',
                                    html: `<p>Don't share with anyone.</p><p>Use this OTP to reset your password.</p><p><strong>This OTP expires after 15 minutes.</strong/></p><p style="font-size: 22px; color: #6E6D70">${otpValue}</p> <p>If you didn't try resetting your password, ignore this email.</p>
                                    `
                                }

                                // Setting up nodemailer
                                let transporter = nodemailer.createTransport({
                                    service: 'Gmail',
                                    auth: {
                                        user: process.env.MAIL_SENDER,
                                        pass: process.env.PASS
                                    } 
                                })

                                transporter.sendMail(mailOptions, (error, info) => {
                                    if (error) {
                                        res.status(500).json({ message: 'Something went wrong while trying to send OTP, try again later' })
                                        return
                                    } else {
                                        res.status(200).json({ message: 'OTP sent successfully' })
                                        return
                                    }
                                })
                            })
                        })
            })

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong, try again later' })
    }
}

async function validateOTP(req, res) {
    try {
        const { email, otp } = req.body
        let userOTP = await OTP.findOne({email})
        let expiresAt, hashedOTP

        if(userOTP){
            expiresAt = userOTP.expiresAt
            hashedOTP = userOTP.OTP

        } else {
            res.status(400).json({ message: 'Invalid OTP' })
            return
        }


        if (!otp || otp.length != 4) {
            res.status(400).json({ message: 'Check OTP and try again' })
            return
        }

        // delete opt if expired
        if (expiresAt < Date.now()) {
            OTP.deleteOne({email})
                .then(() => {
                    res.status(404).json({ message: 'OTP has expired, input your email to send another OTP' })
                    return
                })
        }

        bcrypt.compare(otp, hashedOTP)
            .then(isOTPCorrect => {
                if (isOTPCorrect) {
                    res.status(200).json({ message: 'OTP correct' })
                    return
                } else {
                    res.status(404).json({ message: 'OTP is not correct' })
                    return
                }
            })

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong, try again later' })
    }
}

async function resetPassword(req, res) {
    try {
        let { email, otp, password, password_confirm } = req.body
        let hashedPwd

        if(password.length < 6){
            res.status(400).json({ message: 'Password length must be greater than 6' })
            return
        }

        if (password != password_confirm) {
            res.status(400).json({ message: 'Passwords do not match' })
            return 
        } else {
            hashedPwd = await bcrypt.hash(password, 10)
        } 

        let checkOtp = await OTP.findOne({ email })

        if (!checkOtp) {
            res.status(400).json({ message: 'OTP not found' })
            return
        }

        let isOtpValid = await bcrypt.compare(otp, checkOtp.OTP)

        if (!otp) {
            res.status(400).json({ message: 'Invalid OTP' })
            return
        }

        if (!isOtpValid) {
            res.status(400).json({ message: 'Invalid OTP' })
            return
        }

        const user = await Users.findOne({ email })

        if(!user){
            res.status(400).json({ message: 'Account with email does not exist' })
            return
        }

        Users.updateOne(
            { email },
            { password: hashedPwd }
        )
            .then(() => res.status(201).json({ message: 'Password reset successful' }))
            .catch((e) => res.status(500).json({ message: 'Something went wrong, try again later' }))

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Something went wrong, try again later' })
    }
}

async function logout(req, res) {
    try {
        res.cookie('token', '', { maxAge: -1});
        res.status(200).json({ message: 'Logout successful' })
    } catch (error) {
        console.log(error)
    }
}

// checking cookie
// remove later
function checkCokie(req, res) {
    try {
        console.log(req.cookies.token)
        res.json('ok')
    } catch (error) {
        console.log(error)
    }
}

export default {
    login,
    forgotPassword,
    validateOTP,
    resetPassword,
    logout,
    checkCokie
}