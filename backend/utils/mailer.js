import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

// Setting up nodemailer
let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.MAIL_SENDER,
        pass: process.env.PASS
    } 
})

transporter.verify((error, success) => {
    if (error) {
        console.log('error with mailer', error)
    } else {
        console.log('mailer ready');
    }
})

let mailer = async (email, subject, body) => {
    let mailOptions = {
        from: 'jnweze2@gmail.com',
        to: email,
        subject: subject,
        html: body
    }

    transporter.sendMail(mailOptions)
}

export default mailer