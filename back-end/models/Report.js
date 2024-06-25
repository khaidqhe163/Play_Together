import mongoose, { Schema } from "mongoose"

const reportSchema = new Schema({
    description: {
        type: String
    },
    screenShot: {
        type: String
    },
    reportReason: {
        type: mongoose.Schema.Types.ObjectId, ref: 'reportreason' 
    },
    title: {
        type: String
    },
    owner: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'user' 
    },
    storyId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'story'
    },
    accused: {
        type: mongoose.Schema.Types.ObjectId, ref: 'user' 
    }
}, {
    timestamps: true,
})

const Report = mongoose.model('report', reportSchema)

export default Report