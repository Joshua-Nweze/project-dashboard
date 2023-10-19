import mongoose, { Schema } from "mongoose";

let adminSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        default: 'admin',
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { collection: 'users', timestamps: true })

let Admin = mongoose.model('Admin', adminSchema)

export default Admin