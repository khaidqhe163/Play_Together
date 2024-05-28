import Story from '../models/Story.js';

const getAllStories = async () => {
    try {
        const stories = await Story.find().exec();
        return stories;
    } catch (error) {
        throw new Error(error.toString());
    }
}

export default {
    getAllStories
}
