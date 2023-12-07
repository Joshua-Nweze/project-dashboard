import Admin from "../model/admin.model.js";
import Users from "../model/user.model.js";
import Invitee from "../model/invitees.model.js";
import BlockedUsers from "../model/blockedUsers.model.js"
import Project from "../model/projects.model.js";

import generatePwd from "../utils/generateRandPwd.js";
import mailer from "../utils/mailer.js";
import bcrypt from 'bcrypt'

async function inviteStaff(req, res) {
    try {
        let { email, adminId } = req.body

        let isAdmin = await Users.findById(adminId)

        
        let userWithEmail = await Users.findOne({ email })

        if (userWithEmail) {
            res.status(400).json({ message: 'User with email exists' })
            return
        }

        if(!isAdmin || isAdmin.userType != 'admin') {
            res.status(401).json({ message: 'You are not allowed to perform this action' })
            return
        }

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
                <p>Go to ..link... to setup your account. You have to set up your account so you can log in</p>
                

                <p>Click the button bellow to setup your account</p>
                                    
                <a href="" target="_blank">
                    <button style="padding: 6px 14px; border-radius: 6px; border: none; background: #6E6D70; text-align: center; color: white">Setup account<button>
                </a>
                `
            )

            res.status(200).json({ message: 'Invite sent successfully' })
        } else {
            res.status(500).json({ message: 'Something went wrong while trying to send invite, try again later' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong, try again later' })
    }
}

async function getAllStaff(req, res) {
    try {
        let { adminId } = req.query

        let isAdmin = await Users.findById(adminId)

        if(!isAdmin || isAdmin.userType != 'admin') {
            res.status(401).json({ message: 'You are not allowed to perform this action' })
            return
        }

        let users = await Users.find({ userType: { $ne: 'admin'} }).select({ password: 0, updatedAt: 0 })

        if(!users || users.length < 1) {
            res.status(404).json({ message: 'No staff found' })
            return
        }

        // let isUserBlocked = await BlockedUsers.findOne({ email })

        let message = []

        for (const user of users) {
            let updated
            // console.log(user);
          
            let isUserBlocked = await BlockedUsers.findOne({ email: user.email });
          
            if (isUserBlocked) {
                updated = {user, isUserBlocked: true};
            } else {
                updated = {user, isUserBlocked: false};
            }
          
            message.push(updated);
          }
          

        res.status(200).json({ message })
    } catch (error) {
        console.log(error)
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
        console.log(error)
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

async function isUserBlocked(req, res) {
    try {
        let { email } = req.query

        if (!email) {
            res.status(400).json({ message: 'User email is required' })
            return
        }

        let isUserBlocked = await BlockedUsers.findOne({ email })

        if (isUserBlocked) {
            res.status(200).json({ message: true })
        } else {
            res.status(200).json({ message: false })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Something went wrong, try again later' })
    }
}

async function createAdminAcc(req, res) {
    try {
        let { email, password } = req.body

        if(!email || !password) {
            res.status(400).json({ message: 'All inputs are required' })
            return
        }

        password = await bcrypt.hash(password, 10)

        let adminExist = await Users.findOne({ userType: 'admin' })

        if (adminExist) {
            res.status(401).json({ message: 'An admin exist already!' })
            return
        }

        let admin = new Users({
            email, 
            password
        })

        let createAdmin = await admin.save()

        if (createAdmin) {
            res.status(200).json({ message: 'Admin created' })
        } else {
            res.status(500).json({ message: 'Something went wrong, try again later' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong, try again later' })
    }
}

async function viewUser(req, res) {
    try {
        let { id } = req.query

        if (!id) {
            res.status(400).json({ message: 'User\'s Id is required' })
            return
        }

        let user = await Users.findById(id).select({ _id: 0, password: 0, updatedAt: 0 })

        let projects = await Project.find({ staff: id })

        let message = {
            user,
            projects
        }

        if (user) {
            res.status(200).json({ message })
        } else {
            res.status(404).json({ message: 'User not found' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Something went wrong, try again later' })
    }
}

async function getUnansweredInvites(req, res) {
    try {
        let { id } = req.query

        if (!id) {
            res.status(401).json({ message: 'You are not allowed to perform this action' })
            return
        }

        let user = await Users.findById(id)

        if(user.userType != 'admin') {
            res.status(401).json({ message: 'You are not allowed to perform this action' })
            return
        }

        let invitees = await Invitee.find().select({ _id: 0, password: 0 })

        res.status(200).json({ message: invitees })

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong, try again later' })
    }
}

async function cancelInvite(req, res) {
    try {
        let { id, email } = req.body

        if (!id) {
            res.status(401).json({ message: 'You are not allowed to perform this action' })
            return
        }

        let user = await Users.findById(id)

        if(user.userType != 'admin') {
            res.status(401).json({ message: 'You are not allowed to perform this action' })
            return
        }

        let deleteInvite = await Invitee.findOneAndDelete({ email })

        if (deleteInvite) {
            res.status(200).json({ message: 'Invite deleted' })
            return
        } else {
            res.status(500).json({ message: 'Something went wrong, try again later' })
            return
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Something went wrong, try again later' })
    }
}

export default {
    inviteStaff,
    getAllStaff,
    blockStaff,
    unblockStaff,
    getBlockedStaff,
    createAdminAcc,
    viewUser,
    isUserBlocked,
    getUnansweredInvites,
    cancelInvite
}