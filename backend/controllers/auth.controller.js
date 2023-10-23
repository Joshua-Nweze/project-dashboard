import Users from "../model/user.model.js"
import BlockedUsers from "../model/blockedUsers.model.js"

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