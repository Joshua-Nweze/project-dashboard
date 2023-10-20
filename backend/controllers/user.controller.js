import Users from "../model/user.model.js";
import BlockedUsers from "../model/blockedUsers.model.js";
import Invitee from "../model/invitees.model.js";
import bcrypt from 'bcrypt'

async function setupAccCheckMail(req, res) {
    try {
        let { email } = req.body

        let user = await Invitee.findOne({ email })

        if(!user) {
            res.status(403).json({ message: 'You have not been invited to be a staff' })
            return
        }

        res.status(200).json({ message: 'You were invited' })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong, try again later' })
    }
}

async function setupAccCheckPwd(req, res) {
    try {
        let { email, password } = req.body

        let user = await Invitee.findOne({ email })

        if(!user) {
            res.status(403).json({ message: 'You have not been invited to be a staff' })
            return
        }

        let comparePwd = await bcrypt.compare(password, user.password)

        if (comparePwd) {
            res.status(200).json({ message: 'Details match' })
            return
        } else {
            res.status(403).json({ message: 'Incorrect password' })
            return
        }
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong, try again later' })
    }
}

async function setupAccDetails(req, res) {
    try {
        let { email, password, name, lga, phoneNumber } = req.body

        let user = await Invitee.findOne({ email })
        let comparePwd = await bcrypt.compare(password, user.password)

        if(!user) {
            res.status(403).json({ message: 'You have not been invited to be a staff' })
            return
        }
        if (!comparePwd) {
            res.status(403).json({ message: 'Incorrect password' })
            return
        }

        if (!email || !password || !name || !lga || !phoneNumber) {
            res.status(400).json({ message: 'All inputs are required' })
            return
        }

        let newUser = new Users({
            email,
            password,
            name,
            lga,
            phoneNumber
        })

        let createAccount = await newUser.save()

        if(!createAccount){
            res.status(500).json({ message: 'Something went wrong, try again later' })
        }

        res.status(200).json({ message: 'Account setup successfull, proceed to login page to login' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Something went wrong, try again later' })
    }
}

async function editAcc(req, res) {
    try {
        let { name, phoneNumber, lga, id } = req.body

        if (!name || !phoneNumber || !lga || !id) {
            res.status(400).json({ message: 'All inputs are required' })
            return
        }

        let user = await Users.findById(id)

        if (!user) {
            res.status(404).json({ message: 'User not found' })
            return
        } else {
            Users.updateOne(
                { _id: id },
                { name, phoneNumber, lga }
            ) 
                .then(() => {
                    res.status(200).json({ message: 'Details updated successfully' })
                })
                .catch((error) => {
                    console.log(error)
                    res.status(500).json({ message: 'Something went wrong, try again later' })
                    return
                })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Something went wrong, try again later' })
    }
}

async function changePwd(req, res) {
    try {
        let { password, new_password, re_new_password, id } = req.body
        let hashedPwd

        if(!password || !new_password || re_new_password) {
            res.status(400).json({ message: 'All inputs are required' })
            return
        }

        let user = await Users.findById(id)

        let pwdCompare = await bcrypt.compare(password, user.password)

        if(!pwdCompare){
            res.status(403).json({ message: 'Incorrect password' })
            return
        }

        if(new_password.length < 6){
            res.status(400).json({ message: 'Password length must be  greater than 6' })
            return
        }

        if (new_password !== re_new_password) {
            res.status(400).json({ message: 'Both passwords must match' })
            return
        } else {
            hashedPwd = await bcrypt.hash(new_password, 10)
        }

        Users.updateOne(
            { _id: id },
            { password: hashedPwd }
        )
            .then(() => res.status(200).json({ message: 'Password reset successful' }))
            .catch((e) => res.status(500).json({ message: 'Something went wrong, try again later' }))
    } catch (error) {
        console.log(error)
    }
}

async function login(req, res) {
    try {
        let { email, password } = req.body

        let isBlocked = await BlockedUsers.findOne({ email })

        if (isBlocked) {
            res.status(403).json({ message: 'Your account was suspended, contact the admin at admin@gmail.com to rectify this' })
            return
        }

        let user = await Users.findOne({ email })

        if (!user) {
            res.status(403).json({ message: 'Incorrect email or password' })
            return
        }

        let comparePwd = await bcrypt.compare(password, user.password)

        if (comparePwd) {
            res.status(200).json({ message: 'Login successful' })
            return
        } else {
            res.status(403).json({ message: 'Incorrect email or password' })
            return
        }
    } catch (error) {
        console.log(error)
    }
}

export default {
    setupAccCheckMail,
    setupAccCheckPwd,
    setupAccDetails
}