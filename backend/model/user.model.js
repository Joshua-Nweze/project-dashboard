import mongoose, { Schema } from "mongoose";

// users are staff
let userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    lga: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        default: 'staff',
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true})

let Users = mongoose.model('Users', userSchema)

export default Users