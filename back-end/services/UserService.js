import User from "../models/User.js";
import Service from "../models/Service.js";
import bcrypt from "bcryptjs";
import jwt from "../middleware/jwt.js";
import Ban from "../models/Ban.js";
import Booking from "../models/Booking.js";
import Comment from "../models/Comment.js";

var salt = bcrypt.genSaltSync(10);
const register = async (email, username, dateOfBirth, gender, password) => {
  try {
    const hashPassword = bcrypt.hashSync(password, salt);
    await User.create({
      email,
      username,
      dateOfBirth,
      gender,
      password: hashPassword,
    });
  } catch (error) {
    throw new Error(error.toString());
  }
};

const findUserByEmail = async (email) => {
  try {
    const existEmail = await User.findOne({ email: email }).exec();
    if (existEmail) return existEmail._doc
    return null;
  } catch (error) {
    throw new Error(error.toString());
  }
};

const autoLogin = async (email) => {
  try {
    const user = await User.findOne({ email: email });
    return user;
  } catch (error) {
    throw new Error(error.toString());
  }
};

const addSocialAccount = async (profile) => {
  try {
    const user = await User.findOne({ email: profile.emails[0].value }).exec();
    if (!user) {
      const account = {
        username: profile.displayName,
        email: profile.emails[0].value,
      };
      User.create(account);
    }
  } catch (error) {
    throw new Error(error.toString());
  }
};

const resetPassword = async (email, password) => {
  try {
    const hashPassword = bcrypt.hashSync(password, salt);
    const user = await User.updateOne(
      { email: email },
      { $set: { password: hashPassword } }
    ).exec();
    if (!user) {
      const account = {
        username: profile.displayName,
        email: profile.emails[0].value,
      };
      User.create(account);
    }
  } catch (error) {
    throw new Error(error.toString());
  }
};

const getAllPlayer = async () => {
  try {
    const players = await User.find({
      "player.duoSettings": true,
      status: false
      // 'player.totalHiredHour': { $gte: 155 },
    }).populate("player.serviceType", "-_id image");
    return players;
  } catch (error) {
    throw new Error(error.toString());
  }
};

const searchPlayerByCriteria = async (gender, category, playerName, gameName, priceRange) => {
  try {
    const query = { 'player.duoSettings': true, 'status': false };

    if (gender) {
      query.gender = gender;
    }

    if (playerName) {
      query.username = { $regex: playerName, $options: 'i' };
    }

    if (priceRange && priceRange.length === 2) {
      query['player.rentCost'] = { $gte: priceRange[0], $lte: priceRange[1] };
    }

    if (category) {
      if (category === "1") {
        // Người mới: Tạo tài khoản trong vòng 1 tháng trở lại đây
        const oneMonthAgo = new Date();
        oneMonthAgo.setDate(oneMonthAgo.getDate() - 7);
        query.createdAt = { $gte: oneMonthAgo };
      }
    }

    console.log(query);

    let players = await User.find(query).populate('player.serviceType').exec();
    players = await Promise.all(players.map(async player => {
      const comments = await Comment.find({ userId: player._id, bookingId: { $exists: true } }).exec();
      const averageStars = comments.length === 0 ? 5.0 : comments.reduce((acc, comment) => acc + comment.rating, 0) / comments.length;
      player = player.toObject();
      player.averageStars = averageStars;
      player.amountVote = comments.length;
      return player;
    }
    ));


    if (gameName) {
      players = players.filter(user =>
        user.player.serviceType.some(service =>
          new RegExp(gameName, 'i').test(service.name)
        )
      );
    }

    if (category === "2") {
      // Hot player: Số giờ thuê cao nhất và tỉ lệ hoàn thành cao hơn 50% trong 7 ngày
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      players = await Promise.all(players.map(async player => {
        const bookings = await Booking.find({ playerId: player._id, createdAt: { $gte: oneWeekAgo } }).exec();
        const completedBookings = bookings.filter(booking => booking.bookingStatus === 2).length;
        const totalBookings = bookings.filter(booking => booking.bookingStatus === 2 || booking.bookingStatus === 4).length;
        const completionRate = totalBookings === 0 ? 0 : (completedBookings / totalBookings);
        // player = player.toObject();
        player.totalHiredHours = player.player.totalHiredHour;
        player.completionRate = completionRate;

        // Tính điểm tổng hợp dựa trên totalHiredHours và completionRate
        player.score = player.totalHiredHours + player.completionRate;

        return player;
      }));
      players = players.filter(player => player.completionRate >= 0.5);
      players = players.sort((a, b) => b.score - a.score);

    } else if (category === "3") {
      // Vip player: Số giờ thuê cao nhất từ trước đến giờ và đánh giá từ 4.5 đến 5.0
      players = await Promise.all(players.map(async player => {

        // const comments = await Comment.find({ userId: player._id, bookingId: { $exists: true } }).exec();
        // const averageStars = comments.length === 0 ? 5.0 : comments.reduce((acc, comment) => acc + comment.rating, 0) / comments.length;
        // player = player.toObject();
        player.totalHiredHours = player.player.totalHiredHour;

        // player.averageStars = averageStars;
        // player.amountVote = comments.length;

        return player;
      }));
      players = players.filter(player => player.averageStars >= 4.5 && player.averageStars <= 5.0);
      players = players.sort((a, b) => b.totalHiredHours - a.totalHiredHours);
    }

    return players;
  } catch (error) {
    throw new Error(error.toString());
  }
};

const getPlayerByServiceId = async (serviceId) => {
  try {
    let players = await User.find({}).populate("player.serviceType").exec();
    players = await Promise.all(players.map(async player => {
      const comments = await Comment.find({ userId: player._id, bookingId: { $exists: true } }).exec();
      const averageStars = comments.length === 0 ? 5.0 : comments.reduce((acc, comment) => acc + comment.rating, 0) / comments.length;
      player = player.toObject();
      player.averageStars = averageStars;
      player.amountVote = comments.length;
      return player;
    }
    ));
    players = players.filter(
      (user) =>
        user.player &&
        user.player.serviceType &&
        user.player.serviceType.some((service) => service._id.equals(serviceId))
    );

    return players;
  } catch (error) {
    throw new Error(error.toString());
  }
};

const findByUserId = async (id) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updatePlayerInfo = async (
  id,
  rentCost,
  info,
  youtubeUrl,
  facebookUrl,
  roomVoice,
  device,
  service,
  videoHightlight,
  achivement
) => {
  try {
    console.log(achivement);
    // const updateData = {
    //   "player.rentCost": rentCost,
    //   "player.info": info,
    //   "player.youtubeUrl": youtubeUrl,
    //   "player.facebookUrl": facebookUrl,
    //   "player.roomVoice": roomVoice,
    //   "player.deviceStatus.cam": device.cam,
    //   "player.deviceStatus.mic": device.mic,
    //   "player.serviceType": service,
    //   "player.videoHightlight": videoHightlight,
    //   "player.achivements": achivement,
    // };
    const updateData = {
      "rentCost": rentCost,
      "info": info,
      "youtubeUrl": youtubeUrl,
      "facebookUrl": facebookUrl,
      "roomVoice": roomVoice,
      "deviceStatus.cam": device.cam,
      "deviceStatus.mic": device.mic,
      "serviceType": service,
      "videoHightlight": videoHightlight,
      "achivements": achivement,
    };
    console.log(updateData);
    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      {
        $set: { player: updateData },
      },
      { new: true, runValidators: true }
    );
    return updatedUser;
  } catch (error) {
    throw new Error(error.toString());
  }
};

const blockOrUnBlock = async (userID, authorID) => {
  try {
    const user = await User.findOne({ _id: userID });
    if (!user) return {}, true, "User not available";

    const author = await User.findOne({ _id: authorID });

    let blocked;
    if (!author.blockedUsers.includes(userID)) {
      blocked = await User.findByIdAndUpdate(
        { _id: authorID },
        { $push: { blockedUsers: userID } },
        { new: true }
      );
    } else {
      blocked = await User.findByIdAndUpdate(
        { _id: authorID },
        { $pull: { blockedUsers: userID } },
        { new: true }
      );
    }

    return blocked;
  } catch (error) {
    throw new Error(error.toString());
  }
};
const getPlayerById = async (id) => {
  try {
    const player = await User.findById(id);
    return player;
  } catch (error) {
    throw new Error(error.toString());
  }
};
const findUserById = async (userId) => {
  try {
    const user = await User.findById(userId).exec();
    return user;
  } catch (error) {
    throw new Error(error.toString());
  }
};

const updateUser = async (userId, newAvatar, gender, dob, username) => {
  try {
    const updateFields = {
      username: username,
      gender: gender,
      dateOfBirth: dob,
    };
    if (newAvatar) {
      updateFields.avatar = newAvatar;
    }
    console.log(updateFields);
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $set: updateFields },
      { new: true }
    );
    return updatedUser;
  } catch (error) {
    throw new Error(error.toString());
  }
};

const updateDuoSetting = async (userId, isDuoEnabled) => {
  try {
    const updateFields = {
      "player.duoSettings": isDuoEnabled,
    };

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $set: updateFields },
      { new: true }
    );
    return updatedUser;
  } catch (error) {
    throw new Error(error.toString());
  }
};

const updateOnlySchedule = async (userId, isOnlySchedule) => {
  try {
    const updateFields = {
      "player.onlySchedule": isOnlySchedule,
    };

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $set: updateFields },
      { new: true }
    );
    return updatedUser;
  } catch (error) {
    throw new Error(error.toString());
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.find({});
    return users;
  } catch {
    throw new Error(error.toString());
  }
};

const banUser = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    user.status = !user.status;
    await user.save();
    return user;
  } catch {
    throw new Error(error.toString());
  }
};

const getFollowerById = async (id) => {
  try {
    const followers = await User.find({ followers: id });
    const users = await User.findOne({ _id: id });
    let returnUsers
    if (followers && followers.length !== 0 && users.blockedUsers && users.blockedUsers.length !== 0) {
      returnUsers = followers.filter((b) => {
        return users.blockedUsers.includes(b._id) === false;
      })
      return returnUsers;
    }

    console.log(followers);
    return followers;
  } catch (error) {
    throw new Error(error.toString());
  }
};
// UserService.js

const followPlayer = async (userId, playerId) => {
  try {
    const user = await User.findByIdAndUpdate(
      playerId,
      { $addToSet: { followers: userId } },
      { new: true }
    );
    return user;
  } catch (error) {
    throw new Error(error.toString());
  }
};

const unfollowPlayer = async (userId, playerId) => {
  try {
    const user = await User.findByIdAndUpdate(
      playerId,
      { $pull: { followers: userId } },
      { new: true }
    );
    return user;
  } catch (error) {
    throw new Error(error.toString());
  }
};

const unban = async (userId) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { status: false } },
      { new: true }
    );
    const ban = await Ban.updateMany(
      { userId: userId, expired: false },
      { $set: { expired: true } }
    );
    return user;
  } catch (error) {
    throw new Error(error.toString());
  }
};

const addImagesToAlbum = async (userId, images) => {
  try {
    const updatedPlayer = await User.findOneAndUpdate(
      { _id: userId },

      { $push: { "player.images": { $each: images, $position: 0 } } },
      { new: true }
    );
    const { password, ...returnPlayer } = updatedPlayer._doc;
    return returnPlayer;
  } catch (error) {
    throw new Error(error.toString());
  }
};

const deleteImageToAlbum = async (index, userId) => {
  try {
    console.log(userId);
    console.log(index);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { 'player.images': index } },
      { new: true } // Return the updated document
    );
    const { password, ...returnPlayer } = updatedUser._doc;
    return returnPlayer;
  } catch (error) {
    throw new Error(error.toString());
  }
};

const getAll = async () => {
  try {
    const users = await User.find({})
    return users
  } catch (error) {
    throw new Error(error.toString());
  }
};

const checkDuoPlayer = async (playerId) => {
  try {
    const user = await User.findOne({ _id: playerId, 'player.duoSettings': true }).exec();
    return user;
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
  blockOrUnBlock,
  findUserById,
  updateUser,
  updateDuoSetting,
  getPlayerById,
  getPlayerByServiceId,
  updatePlayerInfo,
  findByUserId,
  getAllUsers,
  banUser,
  followPlayer,
  unfollowPlayer,
  updateOnlySchedule,
  getFollowerById,
  unban,
  addImagesToAlbum,
  deleteImageToAlbum,
  getAll,
  checkDuoPlayer,
};
