import mongoose, { Schema } from "mongoose";

let milestoneSchema = new Schema({
    milestone: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    date: {
        type: Date,
        required: true
    },
    images: [{
        type: Buffer
    }]
})

let projectSchema = new Schema({
    staff: {
        type: String,
        required: true
    },
    projectName: {
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
        path: { type: String, required: true },
        imageBase64: { type: String, required: true },
      },
    milestone: [milestoneSchema]
})


let Project = mongoose.model('Project', projectSchema)

export default Project