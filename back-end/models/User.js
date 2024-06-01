import mongoose, { Schema } from "mongoose";
import Service from './Service.js'

const achivementSchema = new Schema({
    date: Date,
    text: String
})

const deviceStatusSchema = new Schema({
    cam: Boolean,
    mic: Boolean
})
const PlayerSchema = new Schema({
    deviceStatus: deviceStatusSchema,
    images: {
        type: [String]
    },
    info: {
        type: String,
        default: ""
    },
    duoSettings: {
        type: Boolean,
        default: false
    },
    facebookUrl: String,
    youtubeUrl: String,
    videoHightlight: String,
    roomVoice: String,
    totalHiredHour: Number,
    contentStatus: String,
    rentCost: {
        type: Number,
        default: 0
    },
    serviceType: [{
        type: Schema.Types.ObjectId,
        ref: Service,
    }],
    achivements: [achivementSchema]
})


const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    gender: {
        type: String
    },
    dateOfBirth: {
        type: Date,
    },
    followers: [
        Schema.Types.ObjectId
    ],
    blockedUsers: [
        Schema.Types.ObjectId
    ],
    accountBalance: {
        type: Number,
        default: 0
    },
    avatar: {
        type: String,
        default: "public\\avatar\\default.webp"
    },
    player: {
        type: PlayerSchema
    }
}, {
    timestamps: true
})

const User = mongoose.model("user", UserSchema);
export default User;