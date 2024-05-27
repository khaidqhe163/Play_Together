import mongoose, { Schema, mongo } from "mongoose";

const PlayerSchema = new Schema({
    deviceStatus: {
        microphone: Boolean,
        camera: Boolean,
    },
    duoSettings: {
        type: Boolean,
        default: false
    },
    facebookUrl: String,
    youtubeUrl: String,
    videoHightlight: String,
    linkRoom: String,
    totalHiredHour: Number,
    contentStatus: String,
    rentCost: {
        type: Number,
        default: 0
    },
    serviceType: [{
        type: Schema.Types.ObjectId
    }],
    achievements: [String]
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
    },
    images: {
        type: [String]
    },
    info: {
        type: String,
        default: ""
    }
    ,
    player: {
        type: PlayerSchema
    }
}, {
    timestamps: true
})

const User = mongoose.model("user", UserSchema);
export default User;