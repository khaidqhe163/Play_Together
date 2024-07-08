import mongoose, { Schema } from "mongoose"

const reportSchema = new Schema({
    description: {
        type: String
    },
    screenShot: [String],
    reportReason: {
        type: Schema.Types.ObjectId, ref: 'reportreason'
    },
    title: {
        type: String
    },
    owner: {
        type: Schema.Types.ObjectId, ref: 'user'
    },
    storyId: {
        type: Schema.Types.ObjectId, ref: 'story'
    },
    accused: {
        type: Schema.Types.ObjectId, ref: 'user'
    },
    formsProcessing: {
        type: String
    },
    status: {
        type: Number,
        default: 1
    }
}, {
    timestamps: true,
})

const Report = mongoose.model('report', reportSchema)

export default Report