import User from '../models/User.js'
import Service from '../models/Service.js';
import bcrypt from 'bcryptjs'
import jwt from '../middleware/jwt.js';

var salt = bcrypt.genSaltSync(10);
const register = async (email, username, dateOfBirth, gender, password) => {
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
        return existEmail._doc
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
};

const searchPlayerByCriteria = async (gender, playerName, gameName, priceRange) => {
    try {
        const query = {};

        if (gender) {
            query.gender = gender;
        }

        if (playerName) {
            query.username = { $regex: playerName, $options: 'i' };
        }

        if (priceRange && priceRange.length === 2) {
            query['player.rentCost'] = { $gte: priceRange[0], $lte: priceRange[1] };
        }
        console.log(query);
        // let players = await User.find(query).populate({
        //     path: 'player.serviceType',
        //     match: { name: { $regex: gameName, $options: 'i' } },
        // }).exec();

        // players = players.filter(user => user.player.serviceType.length > 0);
        let players = await User.find(query).populate('player.serviceType').exec();
        // Lọc lại các player có serviceType khớp với gameName
        players = players.filter(user =>
            user.player.serviceType.some(service =>
                new RegExp(gameName, 'i').test(service.name)
            )
        );

        return players;
    } catch (error) {
        throw new Error(error.toString());
    }
}

const updatePlayerInfo = async (id, rentCost, info, youtubeUrl, facebookUrl, roomVoice, device, service, videoHightlight, achivement) => {
    try {
        console.log(achivement);
        const updateData = {
            'player.rentCost': rentCost,
            'player.info': info,
            'player.youtubeUrl': youtubeUrl,
            'player.facebookUrl': facebookUrl,
            'player.roomVoice': roomVoice,
            'player.deviceStatus.cam': device.cam,
            'player.deviceStatus.mic': device.mic,
            'player.serviceType': service,
            'player.videoHightlight': videoHightlight,
            'player.achivements': achivement
        };

        const updatedUser = await User.findOneAndUpdate(
            { _id: id },
            {
                $set: updateData
            },
            { new: true, runValidators: true }
        );
        return updatedUser
    } catch (error) {
        throw new Error(error.toString());
    }
}

const getPlayerById = async (id) => {
    try {
        const player = await User.findById(id);
        return player;
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
    searchPlayerByCriteria,
    updatePlayerInfo,
    getPlayerById
}