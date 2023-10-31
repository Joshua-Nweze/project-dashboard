import Admin from "../model/admin.model.js";
import Users from "../model/user.model.js";
import Invitee from "../model/invitees.model.js";
import BlockedUsers from "../model/blockedUsers.model.js"

import generatePwd from "../utils/generateRandPwd.js";
import mailer from "../utils/mailer.js";
import bcrypt from 'bcrypt'

async function inviteStaff(req, res) {
    try {
        let { email, adminId } = req.body

        // let isAdmin = await Users.findById(adminId)

        // if(!isAdmin || isAdmin.userType != 'admin') {
        //     res.status(401).json({ message: 'You are not allowed to perform this action' })
        //     return
        // }

        let randPwd = generatePwd()
        let hashedPwd = await bcrypt.hash(randPwd, 10)

        let newInvitee = new Invitee({
            email,
            password: hashedPwd
        })

        let hasBeenInvited = await Invitee.findOne({ email })

        if (hasBeenInvited) {
           await Invitee.findOneAndDelete({ email })
        }

        let invite = await newInvitee.save()

        if (invite) {
            // accepts 3 params
            // recievers email, email subject, email body
            mailer(
                email,
                'Invitation to be a staff in Enugu State Ministry of Works dashboard',
                `<p>You've been invited to be a staff in Enugu State Ministry of Works dashboard.</p>
                <p>Use your email to log in. <br /> This is your password: <b>${randPwd}</b> <br /> You can change it after setting up your account.</p>
                <p><b>DON'T SHARE THIS WITH ANYONE</b></p>
                <p>Go to ..link... to setup your account. You have to set up your account so you can log in</p>`
            )

            res.status(200).json({ message: 'Invite sent successfully' })
        } else {
            res.status(500).json({ message: 'Something went wrong while trying to send invite, try again later' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Something went wrong, try again later' })
    }
}

async function getAllStaff(req, res) {
    try {
        let { adminId } = req.body

        let isAdmin = await Users.findById(adminId)

        if(!isAdmin || isAdmin.userType != 'admin') {
            res.status(401).json({ message: 'You are not allowed to perform this action' })
            return
        }

        let users = await Users.find()

        if(!users || users.length < 1) {
            res.status(404).json({ message: 'No staff found' })
            return
        }

        res.status(200).json({ message: users })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong, try again later' })
    }
}

async function blockStaff(req, res) {
    try {
        let { email, adminId } = req.body

        let isAdmin = await Users.findById(adminId)

        if(!isAdmin || isAdmin.userType != 'admin') {
            res.status(401).json({ message: 'You are not allowed to perform this action' })
            return
        }

        if(!email){
            res.status(403).json({ message: 'Invalid email' })
            return
        }

        //checking in user with email exists
        let user = await Users.findOne({ email })

        if(!user){
            res.status(404).json({ message: 'Staff not found' })
            return
        }

        //checking in user is already blocked
        let isAlreadyBlocked = await BlockedUsers.findOne({ email })

        if(isAlreadyBlocked){
            res.status(400).json({ message: `Staff has been already been blocked` })
            return
        } else {
            let newBlockedUser = new BlockedUsers({ email })

            newBlockedUser.save()
                .then(() => {
                    res.status(200).json({ message: `Staff has been blocked successfully` })
                })
        }
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong, try again later' })
    }
}

async function unblockStaff (req, res) {
    try {
        let { email, adminId } = req.body

        let isAdmin = await Users.findById(adminId)

        if(!isAdmin || isAdmin.userType != 'admin') {
            res.status(401).json({ message: 'You are not allowed to perform this action' })
            return
        }

        if(!email){
            res.status(403).json({ message: 'Invalid email' })
            return
        }

        //checking in user is blocked
        let blockedUser = await BlockedUsers.findOne({ email })

        if(!blockedUser){
            res.status(404).json({ message: 'Staff not found' })
        } else {
            BlockedUsers.findOneAndDelete({ email })
                .then(() => {
                    res.status(200).json({ message: 'Staff unblocked successfully' })
                })
        }
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong, try again later' })
    }
}

async function getBlockedStaff (req, res) {
    try {
        let { adminId } = req.body

        let isAdmin = await Users.findById(adminId)

        if(!isAdmin || isAdmin.userType != 'admin') {
            res.status(401).json({ message: 'You are not allowed to perform this action' })
            return
        }

        let blockedUsers = await BlockedUsers.find()

        if (blockedUsers.length < 1) {
            res.status(404).json({ message: 'No blocked user' })
            return
        } else {
            res.status(200).json({ message: blockedUsers })
            return
        }

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong, try again later' })
    }
}

export default {
    inviteStaff,
    getAllStaff,
    blockStaff,
    unblockStaff,
    getBlockedStaff
}