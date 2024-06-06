import { PaymentService } from "../services/index.js";

const createPayment = async (req, res) => {
    try {
        const id = req.payload.id;
        const {total} = req.body;
        console.log(total);
        const aPayment = await PaymentService.createPayment({id, total});
        res.status(201).json({message:"Nạp tiền thành công ❤️",aPayment});
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        });
    }
}

export default {
    createPayment,
}