import Donate from "../models/Donate.js";

const createDonate = async (objDonate) => {
    try {
        const aDonate = await Donate.create(objDonate);
        return aDonate;
    } catch (error) {
        throw new Error(error)
    }
};

export default {
    createDonate
}
