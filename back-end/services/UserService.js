import User from '../models/User.js'
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
        const token = jwt.signAccessToken({ id: user._id, email: user.email, username: user.username });
        const { password, ...returnInfo } = user._doc;
        return {
            user: returnInfo,
            accessToken: token
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
export default {
    register,
    findUserByEmail,
    autoLogin,
    addSocialAccount
}