import { UserService, BanService } from "../services/index.js"
import jwt from '../middleware/jwt.js';
import bcrypt from 'bcryptjs'
import User from "../models/User.js";
import Booking from "../models/Booking.js";
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
                message: "Email của bạn đã được đăng ký"
            })
        }
        await UserService.register(email, username, dob, gender, password);
        res.status(201).json({
            message: "Đăng ký thành công"
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
                message: "Email chưa được đăng ký"
            })
        }
        const hashPassword = bcrypt.compareSync(req.body.password, user.password);
        if (!hashPassword) {
            return res.status(401).json({
                message: "Sai mật khẩu"
            })
        }
        console.log(user.role);
        if (user.role === 2) {
            return res.status(401).json({
                message: "Sai thông tin tài khoản!"
            }) 
        }
        if (user.status) {
            console.log("zoday");
            const ban = await BanService.getBanByUserId(user._id);
            const endTime = new Date(ban.endTime);
            console.log(endTime);
            console.log(Date.now() < endTime);
            if (Date.now() < endTime) {
                console.log("ban");
                return res.status(401).json({
                    message: "Tài khoản của bạn đã bị cấm"
                })
            } else {
                await UserService.unban(user._id);
            }
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
        const user = await UserService.findUserByEmail(req.payload.email);
        const refreshToken = req.cookies.RefreshToken;
        if (user.status) {
            const ban = await BanService.getBanByUserId(user._id);
            const endTime = new Date(ban.endTime);
            console.log(endTime);
            console.log(Date.now() < endTime);
            if (Date.now() < endTime) {
                console.log("ban");
                return res.status(401).json({
                    message: "Tài khoản của bạn đã bị cấm"
                })
            } else {
                await UserService.unban(user._id);
            }
        }
        const accessToken = jwt.signAccessToken({ id: user._id, email: user.email, username: user.username });
        const { password, ...returnUser } = user;
        res.cookie("AccessToken", accessToken, { maxAge: 1000 * 60 * 60, httpOnly: true });
        res.status(200).json({
            user: returnUser,
            accessToken: accessToken,
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
        const accessToken = jwt.signAccessToken({ id: user._id, email: user.email, username: user.username });
        const refreshToken = jwt.signRefreshToken({ id: user._id, email: user.email, username: user.username });
        res.cookie("RefreshToken", refreshToken, { maxAge: 1000 * 60 * 60 * 24 * 360, httpOnly: true });
        res.status(200).json({
            user: user,
            accessToken: accessToken,
            refreshToken: refreshToken
        });
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
        const { gender, category, playerName, gameName, priceRange } = req.body;
        const players = await UserService.searchPlayerByCriteria(gender, category, playerName, gameName, priceRange);
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
        console.log(req.body);
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

const blockOrUnBlock = async (req, res) => {
    try {
        const authorID = req.payload.id
        const userID = req.params.id
        const blockedUser = await UserService.blockOrUnBlock(userID, authorID);
        res.status(200).json(blockedUser);
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        });
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
        const { _id, username, gender, followers, player, avatar, images, dateOfBirth, createdAt } = user;
        const returnPlayer = { _id, username, gender, followers, player, avatar, images, dateOfBirth, createdAt }
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
        const newAvatar = req.file?.path;
        const { gender, dob, username } = req.body;

        const updatedUser = await UserService.updateUser(userId, newAvatar, gender, dob, username);
        if (newAvatar) {
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

const updateOnlySchedule = async (req, res) => {
    try {
        const userId = req.payload.id;
        const { isOnlySchedule } = req.body;

        const updatedUser = await UserService.updateOnlySchedule(userId, isOnlySchedule);
        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        res.status(500).json({ message: error.toString() });
    }
};


const getAllUsers = async (req, res) => {
    try {
        const users = await UserService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const banUser = async (req, res) => {
    try {
        const {
            complaint,
            reason,
            userId
        } = req.body;
        let endDate;
        console.log(complaint);
        switch (complaint) {
            case 1:
                console.log("zoday");
                endDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
                break;
            case 2:
                endDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
                break;
            case 3:
                endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
                break;
            case 4:
                endDate = new Date(Date.now() + 100 * 365.25 * 24 * 60 * 60 * 1000);
                break;
            default:
                break;
        }

        const player = await UserService.getPlayerById(userId);
        // const transporter = nodemailer.createTransport({
        //     host: "smtp.gmail.com",
        //     port: 587,
        //     secure: false, // Use `true` for port 465, `false` for all other ports
        //     auth: {
        //         user: "khaidqhe163770@fpt.edu.vn",
        //         pass: "iyrdweksgcrjokhw",
        //     },
        // });
        // const handlebarOptions = {
        //     viewEngine: {
        //         partialsDir: path.resolve('./templates/'),
        //         defaultLayout: false,
        //     },
        //     viewPath: path.resolve('./templates/'),
        // };
        // transporter.use('compile', hbs(handlebarOptions))
        // const mail = {
        //     from: '"Play Together" <khaidqhe163770@fpt.edu.vn>',
        //     to: `${player.email}`,
        //     subject: 'Report player',
        //     template: 'reportplayer',
        //     context: {
        //         description: reason,
        //     },
        //     attachments: [{
        //         filename: 'warning-email.png',
        //         path: './public/warning-email.png',
        //         cid: 'emailbackground' //same cid value as in the html img src
        //     }]
        // }
        // transporter.sendMail(mail);
        // console.log("Send End");
        console.log(endDate);
        const user = await BanService.banUser(userId, endDate, reason);
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: error.toString() });
    }
}

const unbanUser = async (req, res) => {
    try {
        const userId = req.body.userId
        const user = await UserService.unban(userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error.toString());
    }
}
const followPlayer = async (req, res) => {
    try {
        const userId = req.payload.id;
        const playerId = req.params.playerId;
        const updatedUser = await UserService.followPlayer(userId, playerId);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.toString() });
    }
};

const unfollowPlayer = async (req, res) => {
    try {
        const userId = req.payload.id;
        const playerId = req.params.playerId;
        const updatedUser = await UserService.unfollowPlayer(userId, playerId);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.toString() });
    }
};
const logout = async (req, res) => {
    try {
        res.clearCookie('AccessToken');
        res.clearCookie('RefreshToken');
        res.status(200).json({
            message: "Logout successful"
        })
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        })
    }
};
  
const addImagesToAlbum = async (req, res) => {
    try {
        const userId = req.payload.id;
        const images = req.files.map(file => file.path);
        console.log(images);
        const updatedUser = await UserService.addImagesToAlbum(userId, images);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.toString() });
    }
};

const getImagesFromAlbum = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await UserService.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const images = user.player.images; 
        res.status(200).json({ images });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching images', error: error.message });
    }
};

const deleteImageToAlbum = async (req, res) => {
    try{
        const image = req.body.image;
        const userId = req.payload.id;
console.log(image);
       
        const user = await UserService.deleteImageToAlbum(image, userId)
        fs.unlinkSync(image)
        res.status(200).json(user);
    }catch (error){
        res.status(500).json({ message: 'Error fetching images', error: error.message });
    }
}

const getHotPlayers = async (req, res) => {
    try {
      // Define the time frame (last 7 days)
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  
      // Query to find players who have bookings in the last 7 days
      const players = await User.find({ "player.duoSettings": true }).populate("player.serviceType").exec();
  
      // Calculate completion rate and total hired hours for each player
      const hotPlayers = await Promise.all(
        players.map(async (player) => {
          const bookings = await Booking.find({
            playerId: player._id,
            createdAt: { $gte: oneWeekAgo },
          }).exec();
          const completedBookings = bookings.filter(
            (booking) => booking.bookingStatus === 2
          ).length;
          const totalBookings = bookings.filter(
            (booking) => booking.bookingStatus === 2 || booking.bookingStatus === 3
          ).length;
          const completionRate = totalBookings === 0 ? 0 : completedBookings / totalBookings;
  
          player = player.toObject();
          player.totalHiredHours = player.player.totalHiredHour;
          player.completionRate = completionRate;
  
          // Calculate a score based on total hired hours and completion rate
          player.score = player.totalHiredHours + player.completionRate;
  
          return player;
        })
      );
  
      // Sort players by score in descending order
      const sortedHotPlayers = hotPlayers.sort((a, b) => b.score - a.score);
  
      // Respond with the sorted hot players
      res.status(200).json(sortedHotPlayers);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching hot players.', error: error.message });
    }
  };

  const getFollowedPlayers = async (req, res) => {
    try {
        const userId = req.payload.id;
        const followers = await UserService.getFollowerById(userId);
        res.status(200).json(followers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching followed players.', error: error.message });
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
    updatePlayerInfo,
    blockOrUnBlock,
    getUserById,
    updateUser,
    updateDuoSetting,
    getPlayerByServiceId,
    getPlayerById,
    changePassword,
    getAllUsers,
    banUser,
    followPlayer,
    unfollowPlayer,
    updateOnlySchedule,
    logout,
    unbanUser,
    logout,
    addImagesToAlbum,
    getImagesFromAlbum,
    deleteImageToAlbum,
    getHotPlayers ,
    getFollowedPlayers
}