import mongoose, { Schema } from "mongoose";

let projectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
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
        required: true
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

let Project = mongoose.model('Project', projectSchema)

export default Project