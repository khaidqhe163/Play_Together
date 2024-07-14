import bodyParser from "body-parser"
import mongoose, { Schema } from "mongoose"

const story = new Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    path: { type: String, required: true },
    text: {
        type: String,
        default: ""
    },
    like: [Schema.Types.ObjectId],
    view: [Schema.Types.ObjectId],
    thumbnail: { type: String, required: true },
    status: {type: Boolean, required: false}
}, {
    timestamps: true,
})

const Story = mongoose.model('story', story)

export default Story