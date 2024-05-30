import Story from '../models/Story.js';

const getAllStories = async () => {
    try {
        const stories = await Story.find().populate("author").exec();
        return stories;
    } catch (error) {
        throw new Error(error.toString());
    }
}


const uploadVideo = async (userId, path, thumbnail, text) => {
    try {
        const video = await Story.create({ userId, path, thumbnail, text, liked: [], viewed: [] });
        return video;
    } catch (error) {
        throw new Error(error.toString())
    }
}

export default {
    getAllStories,
    uploadVideo
}
