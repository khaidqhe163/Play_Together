import mongoose, { Schema } from "mongoose"
import User from "./User.js"
const playment = new Schema({
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: User
    },
    money: {
        type: Number,
        default: 0
    },
    
}, {
    timestamps: true
})

const Playment = mongoose.model('playment', playment)

export default Playment