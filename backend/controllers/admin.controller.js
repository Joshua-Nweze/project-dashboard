import Admin from "../model/admin.model.js";
import Users from "../model/user.model.js";
import Invitee from "../model/invitees.model.js";
import generatePwd from "../utils/generateRandPwd.js";
import mailer from "../utils/mailer.js";
import bcrypt from 'bcrypt'

async function inviteStaff(req, res) {
    try {
        let { email } = req.body

        let randPwd = generatePwd()
        let hashedPwd = await bcrypt.hash(randPwd, 10)

        let newInvitee = new Invitee({
            email,
            tempPwd: hashedPwd
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
        res.status(500).json({ message: 'Something went wrong, try again later' })
    }
}

export default {
    inviteStaff
}