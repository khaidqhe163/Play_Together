import mongoose, { Schema } from 'mongoose';

const banSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    reason: { type: String, required: true },
    expired: { type: String, default: false }
}, {
    timestamps: true
});

const Ban = mongoose.model('Ban', banSchema);

export default Ban;
