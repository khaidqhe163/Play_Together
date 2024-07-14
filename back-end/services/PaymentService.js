import Payment from "../models/Payment.js";

const createPayment = async ({id, total}) => {
    try {
        const aService = await Payment.create({userId:id, money:total});
        return aService;
    } catch (error) {
        throw new Error(error);
    }
}

const getAll = async () => {
    try {
        const allPlayment = await Payment.find({});
        return allPlayment;
    } catch (error) {
        throw new Error(error);
    }
}

export default {
    createPayment,
    getAll,
}