import mongoose, { Schema } from 'mongoose'

let OTPSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    OTP: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    }
})

const OTP = mongoose.model('OTP', OTPSchema)

export default OTP