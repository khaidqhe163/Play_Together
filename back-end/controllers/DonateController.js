import { DonateService, UserService } from "../services/index.js";


const createDonate = async (req, res) => {
    try {
        const { userId, playerId, money, content } = req.body;
        const aUser = await UserService.findByUserId(userId);
        const aPlayer = await UserService.getPlayerById(playerId);
        aUser.accountBalance -= parseInt(money);
        aUser.save();
        const { password, ...restUser } = aUser._doc;
        aPlayer.accountBalance += parseInt(money) * 0.95;
        aPlayer.save();
        const aDonate = await DonateService.createDonate({ userId, playerId, money, content });
        res.status(201).json({ message: "Donate thành công! ✔️", restUser, aDonate});
    } catch (error) {
        res.status(500).json(error);
    }
};
export default {
    createDonate
}