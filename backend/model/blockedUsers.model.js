import mongoose, { Schema } from "mongoose";

let blockedUsersSchema = new Schema({
    email: {
        type: String,
        required: true
    }
})

let BlockedUsers = mongoose.model('BlockedUsers', blockedUsersSchema)

export default BlockedUsers