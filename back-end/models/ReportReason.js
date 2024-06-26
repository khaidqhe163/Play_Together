import mongoose, { Schema } from "mongoose"

const reportReasonSchema = new Schema({
    content: {
        type: String
    },
    type: {
        type: Number
    }
}, {
    timestamps: true,
})

const ReportReason = mongoose.model('reportreason', reportReasonSchema)

export default ReportReason