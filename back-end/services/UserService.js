import User from '../models/User.js'
import Service from '../models/Service.js';
import bcrypt from 'bcryptjs'
import jwt from '../middleware/jwt.js';

var salt = bcrypt.genSaltSync(10);
const register = async (email, username, dob, gender, password) => {
    try {
        const hashPassword = bcrypt.hashSync(password, salt)
        await User.create({ email, username, dob, gender, password: hashPassword });
    } catch (error) {
        throw new Error(error.toString());
    }
}


const findUserByEmail = async (email) => {
    try {
        const existEmail = await User.findOne({ email: email }).exec();
        return existEmail
    } catch (error) {
        throw new Error(error.toString());
    }

}

const autoLogin = async (email) => {
    try {
        const user = await User.findOne({ email: email }).exec();
        const { password, ...returnInfo } = user._doc;
        return {
            user: returnInfo,
        };
    } catch (error) {
        throw new Error(error.toString());
    }
}

const addSocialAccount = async (profile) => {
    try {
        const user = await User.findOne({ email: profile.emails[0].value }).exec();
        if (!user) {
            const account = {
                username: profile.displayName,
                email: profile.emails[0].value
            }
            User.create(account);
        }
    } catch (error) {
        throw new Error(error.toString());
    }
}

const resetPassword = async (email, password) => {
    try {
        const hashPassword = bcrypt.hashSync(password, salt)
        const user = await User.updateOne({ email: email }, { $set: { password: hashPassword } }).exec();
        if (!user) {
            const account = {
                username: profile.displayName,
                email: profile.emails[0].value
            }
            User.create(account);
        }
    } catch (error) {
        throw new Error(error.toString());
    }
}

const getAllPlayer = async () => {
    try {
        const players = await User.find({
            'player.duoSettings': true,
            'player.totalHiredHour': { $gte: 155 },
        }).populate("player.serviceType", "-_id image");
        return players;
    } catch (error) {
        throw new Error(error.toString());
    }
}
export default {
    register,
    findUserByEmail,
    autoLogin,
    addSocialAccount,
    resetPassword,
    getAllPlayer,
}