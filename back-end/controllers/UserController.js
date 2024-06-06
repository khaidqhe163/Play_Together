import { UserService } from "../services/index.js"
import jwt from '../middleware/jwt.js';
import bcrypt from 'bcryptjs'
// import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import hbs from 'nodemailer-express-handlebars'
import * as path from 'path'
import fs from "fs"

const register = async (req, res) => {
    try {
        const {
            email,
            username,
            dob,
            gender,
            password
        } = req.body;
        const existEmail = await UserService.findUserByEmail(email);
        if (existEmail) {
            return res.status(400).json({
                message: "Your email has registered!"
            })
        }
        await UserService.register(email, username, dob, gender, password);
        res.status(201).json({
            message: "Register successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        });
    }
}

const login = async (req, res) => {
    try {
        const user = await UserService.findUserByEmail(req.body.email);
        if (!user) {
            return res.status(401).json({
                message: "Wrong email"
            })
        }
        const hashPassword = bcrypt.compareSync(req.body.password, user.password);
        if (!hashPassword) {
            return res.status(401).json({
                message: "Wrong password"
            })
        }
        const accessToken = jwt.signAccessToken({ id: user._id, email: user.email, username: user.username });
        const refreshToken = jwt.signRefreshToken({ id: user._id, email: user.email, username: user.username });
        const { password, ...returnUser } = user;
        res.cookie("RefreshToken", refreshToken, { maxAge: 1000 * 60 * 60 * 24 * 360, httpOnly: true });
        res.cookie("AccessToken", accessToken, { maxAge: 1000 * 60 * 60, httpOnly: true });
        res.status(200).json({
            user: returnUser,
            accessToken: accessToken,
            refreshToken: refreshToken
        })
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        })
    }
}

const autoLogin = async (req, res) => {
    try {
        const user = await UserService.autoLogin(req.payload.email);
        const refreshToken = req.cookies.RefreshToken;
        const { password, ...returnUser } = user.user;
        res.status(200).json({
            user: returnUser,
            accessToken: user.accessToken,
            refreshToken: refreshToken
        });
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        })
    }
}

const loginPassport = async (req, res) => {
    try {
        let token = req.body.token;
        token = atob(token);
        const tokenElements = token.split(":");
        if (tokenElements[1] < Date.now() - 5 * 1000) {
            throw new Error("Token is expired!");
        }
        console.log(tokenElements);
        const user = await UserService.autoLogin(tokenElements[0]);
        res.cookie("jwt", user.accessToken, { maxAge: 60000, httpOnly: true });
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        })
    }
}

const sendEmail = async (req, res) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
                user: "khaidqhe163770@fpt.edu.vn",
                pass: "iyrdweksgcrjokhw",
            },
        });
        const handlebarOptions = {
            viewEngine: {
                partialsDir: path.resolve('./templates/'),
                defaultLayout: false,
            },
            viewPath: path.resolve('./templates/'),
        };
        transporter.use('compile', hbs(handlebarOptions))
        const user = await UserService.findUserByEmail(req.body.email);
        if (!user) {
            return res.status(400).json({
                message: "Email chưa được đăng ký!"
            })
        }
        const updateAt = user.updatedAt;
        const updateDate = new Date(updateAt);
        let token = req.body.email + "&" + (Date.now() + 5 * 60 * 1000) + "&" + updateDate.getMilliseconds();
        token = btoa(token);
        const mail = {
            from: '"Play Together" <khaidqhe163770@fpt.edu.vn>',
            to: `${req.body.email}`,
            subject: 'Reset Password',
            template: 'resetpassword',
            context: {
                email: req.body.email,
                link: `http://localhost:3000/resetpassword/${token}`
            },
            attachments: [{
                filename: 'imagebackground.png',
                path: './public/emailbackground.png',
                cid: 'emailbackground' //same cid value as in the html img src
            }, {
                filename: 'lockicon.png',
                path: './public/lockicon.png',
                cid: 'lockicon'
            }]
        }
        transporter.sendMail(mail);
        console.log("Send End");
        return res.status(200).json({
            message: "Send email success"
        })
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        })
    }
}

const verifyToken = async (req, res) => {
    try {
        let token = req.body.token;
        token = atob(token);
        const splToken = token.split("&");
        const user = await UserService.findUserByEmail(splToken[0]);
        if (splToken[1] < Date.now()) {
            return res.status(404).json({
                message: "Token 1 is not valid!"
            })
        };
        const updateDate = new Date(user.updatedAt);
        if (updateDate.getMilliseconds() != splToken[2]) {
            return res.status(404).json({
                message: "Token 2 is not valid!"
            })
        }
        res.status(200).json({
            message: "Token is valid!",
            email: splToken[0]
        })
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        })
    }
}

const resetPassword = async (req, res) => {
    try {

        const resetPassword = await UserService.resetPassword(req.body.email, req.body.password);
        res.status(200).json({
            message: "reset password success"
        })
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        })
    }
}

const getAllPlayer = async (req, res) => {
    try {
        const players = await UserService.getAllPlayer();
        if (players.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy người chơi nào.' });
        }

        res.status(200).json(players);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi truy vấn danh sách người dùng.', error: error.message });
    }
};

const searchPlayerByCriteria = async (req, res) => {
    try {
        const { gender, playerName, gameName, priceRange } = req.body;
        const players = await UserService.searchPlayerByCriteria(gender, playerName, gameName, priceRange);
        res.status(200).json(players);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi truy vấn danh sách người dùng.', error: error.message });
    }
}
const getPlayerByServiceId = async (req, res) => {
    try {
        const serviceId = req.params.serviceId;
        const players = await UserService.getPlayerByServiceId(serviceId);
        res.status(200).json(players);

    }
    catch (error) {
        res.status(500).json({ message: 'Lỗi khi truy vấn danh sách người dùng.', error: error.message });
    }
}
const updatePlayerInfo = async (req, res) => {
    try {
        const userId = req.payload.id;
        const {
            rentCost,
            info,
            youtubeUrl,
            facebookUrl,
            roomVoice,
            deviceStatus,
            serviceType,
            videoHightlight,
            achivements
        } = req.body
        const device = JSON.parse(deviceStatus);
        const service = JSON.parse(serviceType)
        const achivement = JSON.parse(achivements)
        const updatePlayer = await UserService.updatePlayerInfo(userId, rentCost, info, youtubeUrl, facebookUrl, roomVoice,
            device, service, videoHightlight, achivement)

        res.status(200).json({
            message: "Update successfully",
            user: updatePlayer
        })
    } catch (error) {
        res.status(500).json(error);
    }
}
const changePassword = async (req, res) => {
    try {
        const id = req.payload.id;
        const { currentPassword, newPassword } = req.body;
        const user = await UserService.findByUserId(id);

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Mật khẩu không đúng!" });
        }
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({ message: "Đổi mật khẩu thành công!" });
    } catch (error) {
        console.error("Change password error:", error);
        return res.status(500).json({ error: "Có lỗi trong việc đổi mật khẩu!" });
    }
};
const getPlayerById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await UserService.getPlayerById(id);
        const { _id, username, gender, followers, player, avatar, images, createdAt } = user;
        const returnPlayer = { _id, username, gender, followers, player, avatar, images, createdAt }
        res.status(200).json(returnPlayer)
    } catch (error) {
        res.status(500).json(error);
    }
}

const getUserById = async (req, res) => {
    try {
        const userId = req.params.userId; 
        const user = await UserService.findUserById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user); 
    } catch (error) {
        res.status(500).json({ message: error.toString() });
    }
};

const updateUser = async (req, res) => {
    try {
        const userId = req.payload.id;
        const newAvatar = req.file?.path ;
        const { gender, dob, username } = req.body;

        const updatedUser = await UserService.updateUser(userId, newAvatar, gender, dob, username);
        if(newAvatar){
            fs.unlinkSync(req.body.avatar)
        }
        console.log(req.body.avatar);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.toString() });
    }
};

const updateDuoSetting = async (req, res) => {
    try {
        const userId = req.payload.id;
        const { isDuoEnabled } = req.body;

        const updatedUser = await UserService.updateDuoSetting(userId, isDuoEnabled);

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.toString() });
    }
};
export default {
    register,
    login,
    autoLogin,
    loginPassport,
    sendEmail,
    verifyToken,
    resetPassword,
    getAllPlayer,
    searchPlayerByCriteria,
    getUserById,
    updateUser,
    updateDuoSetting,
    getPlayerByServiceId,
    updatePlayerInfo,
    getPlayerById,
    changePassword
}