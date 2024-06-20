import mongoose, { Schema } from "mongoose"
import User from "./User.js"
const payment = new Schema({
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

const Payment = mongoose.model('payment', payment)

export default Payment