import Invitee from "../model/invitees.model.js";
import Users from "../model/user.model.js";
import bcrypt from 'bcrypt'

async function setupAccCheckMail(req, res) {
    try {
        let { email } = req.body

        let user = await Invitee.findOne({ email })

        if(!user) {
            res.status(401).json({ message: 'You have not been invited to be a staff' })
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
            res.status(200).json({ message: 'Authentication successful' })
            return
        } else {
            res.status(401).json({ message: 'Incorrect password' })
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
            res.status(401).json({ message: 'Incorrect password' })
            return
        }

        if (!email || !password) {
            res.status(400).json({ message: 'Something went wrong, try inputting your password again' })
            return
        }

        if (!name || !lga || !phoneNumber) {
            res.status(400).json({ message: 'All inputs are required' })
            return
        }

        let checkIfUserExists = await Users.findOne({ email })

        if (checkIfUserExists) {
            res.status(403).json({ message: 'User with email already exists' })
            return
        }

        password = await bcrypt.hash(password, 10)

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

        res.status(201).json({ message: 'Account setup successfull, proceed to login page to login' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Something went wrong, try again later' })
    }
}

export default {
    setupAccCheckMail,
    setupAccCheckPwd,
    setupAccDetails
}