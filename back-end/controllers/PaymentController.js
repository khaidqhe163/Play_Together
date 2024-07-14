import { PaymentService, UserService } from "../services/index.js";

const createPayment = async (req, res) => {
    try {
        const id = req.payload.id;
        const {total} = req.body;
        const aPayment = await PaymentService.createPayment({id, total});
        const aUser = await UserService.findUserById(id);
        aUser.accountBalance += parseInt(total);
        await aUser.save();
        const {password, ...restUser} = aUser._doc;
        res.status(201).json({message:"Nạp tiền thành công ❤️",restUser});
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        });
    }
}

const getAll = async (req, res) => {
    try {
        const payments = await PaymentService.getAll();
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        });
    }
}

export default {
    createPayment,
    getAll,
}