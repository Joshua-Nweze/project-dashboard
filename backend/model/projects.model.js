import mongoose, { Schema } from "mongoose";

let milestoneSchema = new Schema({
    milestone: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: Buffer
    }
})

let projectSchema = new Schema({
    staffId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    lga: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    endDate: {
        type: Date,
        default: null
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: Buffer,
        required: true
    },
    milestone: [milestoneSchema]
})


let Project = mongoose.model('Project', projectSchema)

export default Project