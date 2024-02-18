import Users from "../model/user.model.js";
import Projects from "../model/projects.model.js";
import bcrypt from 'bcrypt'

async function editAcc(req, res) {
    try {
        let { name, phoneNumber, lga, id } = req.body

        if (!name || !phoneNumber || !lga || !id) {
            res.status(400).json({ message: 'All inputs are requcrred' })
            return
        }

        let user = await Users.findById(id)

        if (!user) {
            res.status(404).json({ message: 'User not found' })
            return
        }

        if (user.userType == 'admin') {
            res.status(401).json({ message: 'You are not allowed to perform this action' })
            return   
        }

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

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong, try again later' })
    }
}

async function changePwd(req, res) {
    try {
        let { password, new_password, re_new_password, id } = req.body
        let hashedPwd

        if(!id || !password || !new_password || !re_new_password) {
            res.status(400).json({ message: 'All inputs are requiredt' })
            return
        }

        let user = await Users.findById(id)

        if(!user) {
            res.status(404).json({ message: 'User not found' })
        }

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
        res.status(500).json({ message: 'Something went wrong, try again later' })
    }
}

async function getDetails(req, res) {
    console.log('req local ', res.locals.user)
    try {
        let { email } = req.query 
        let details = await Users.findOne({ email })
        
        if(!details){
            res.status(404).json({ message: 'User not found' })
            return
        }

        res.status(200).json({
            id: details._id,
            email: details.email,
            name: details.name,
            lga: details.lga,
            phoneNumber: details.phoneNumber,
            userType: details.userType
        })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong, try again later' })
    }
}

async function deleteAccount(req, res){
    try {
        let { email, password, id } = req.body

        if(!email || !password || !id) {
            res.status(400).json({ message: 'Missing req.body values' })
            return
        }

        let user = await Users.findOne({ email })

        if(user.userType == 'admin') {
            res.status(401).json({ message: 'You are not allowed to perform this action' })
            return
        }

        if (!user) {
            res.status(404).json({ message: 'Account not found' })
            return
        } else {
            // compare password in db and password provided by the user
            let pwdCompare = await bcrypt.compare(password, user.password)

            if (pwdCompare) {
                // delete user if password matches
                let delUser = await Users.findOneAndDelete({ email })

                if (!delUser) {
                    res.status(500).json({ message: 'Something went wrong, try again later' })
                    return
                } else {
                    let delUserProjects = await Projects.deleteMany({ staff: id })

                    if (!delUserProjects) {
                        res.status(500).json({ message: 'Something went wrong, try again later' })

                        return
                    }

                    res.status(200).json({ message: 'Account deleted' })
                    return
                }

            } else {
                res.status(401).json({ message: 'Incorrect password' })
                return
            }
        }
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong, try again later' })
    }
}

export default {
    getDetails,
    deleteAccount,
    editAcc,
    changePwd
}