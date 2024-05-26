import { Service } from "../services/index.js"

const createService = async (req, res) => {
    try {
        const {name, image} = req.body;
        const aService = await Service.createService({name, image});
        res.status(201).json(aService);
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        });
    }
}
const getAllService = async (req, res) => {
    try {
        const allService = await Service.getAllService();
        res.status(200).json(allService);
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        });
    }
}
export default {
    createService,
    getAllService,
}