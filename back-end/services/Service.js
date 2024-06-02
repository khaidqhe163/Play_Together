import Service from '../models/Service.js'

const createService = async ({name, image}) => {
    try {
        const aService = await Service.create({name, image});
        return aService;
    } catch (error) {
        throw new Error(error);
    }
}
const getAllService = async () => {
    try {
        const allService = await Service.find({});
        console.log(allService);
        return allService;
    } catch (error) {
        throw new Error(error);
    }
}
export default{
    createService,
    getAllService,
}