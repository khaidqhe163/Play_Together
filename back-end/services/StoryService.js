import Story from '../models/Story.js';

const getAllStories = async () => {
    try {
        const stories = await Story.find().exec();
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

const getStoryDetail = async (storyId) => {
    try {
      const story = await Story.findById(storyId).populate('author', 'avatar username');
      if (!story) {
        throw new Error('Story not found');
      }
      return story;
    } catch (error) {
      throw new Error(error.message);
    }
  };

export default {
    getAllStories,
    uploadVideo,
    getStoryDetail,
}
