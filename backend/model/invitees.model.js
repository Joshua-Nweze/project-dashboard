import mongoose, { Schema } from "mongoose";

let inviteeSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

let Invitee = mongoose.model('Invitee', inviteeSchema)

export default Invitee