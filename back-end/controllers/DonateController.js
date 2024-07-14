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

const getAll = async (req, res) => {
    try {
        const donates = await DonateService.getAll();
        res.status(200).json(donates);
    } catch (error) {
        res.status(500).json(error);
    }
}

const getTopDonorsByPeriod = async (req, res) => {
    const { period } = req.params;

    try {
        const topDonors = await DonateService.getTopDonorsByPeriod(period);
        res.status(200).json(topDonors);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export default {
    createDonate,
    getAll,
    getTopDonorsByPeriod,
}