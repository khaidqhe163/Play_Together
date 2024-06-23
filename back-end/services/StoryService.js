import Story from '../models/Story.js';
import User from '../models/User.js';
import fs from 'fs';

const getAllStories = async () => {
    try {
        const stories = await Story.find().populate("author", "_id username avatar").exec();
        return stories;
    } catch (error) {
        throw new Error(error.toString());
    }
}

const uploadVideo = async (userId, path, thumbnail, text) => {
    try {
        const video = await Story.create({ author: userId, path, thumbnail, text, liked: [], viewed: [] });
        const returnVideo = Story.findById(video._id).populate("author").exec();
        return returnVideo;
    } catch (error) {
        throw new Error(error.toString())
    }
}

const deleteStory = async (id) => {
    try {
        const story = await Story.findById(id);
        if (!story) {
            throw new Error('Story not found');
        }
        fs.unlinkSync(story.path);  
        fs.unlinkSync(story.thumbnail);  
        await Story.findByIdAndDelete(id);  
        return story;
    } catch (error) {
        throw new Error(error.toString());
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

const likeOrUnlikeStory = async (userID, storyID) => {
    try {
        const user = await User.findOne({ _id: userID})
        if(!user) return ({}, true, "User not available")

        const story = await Story.findOne({ _id: storyID })

        let liked 
        if (!story.like.includes(userID)) {
            liked = await Story.findByIdAndUpdate({ _id: storyID }, { $push: { like: userID}}, {new: true})
        } else {
            liked = await Story.findByIdAndUpdate({ _id: storyID }, { $pull: { like: userID}}, {new: true})
        }

        return liked
    } catch (error) {
        throw new Error(error.toString());
    }
}

const viewStory = async (userID, storyID) => {
    try {
        const user = await User.findOne({ _id: userID})
        if(!user) return ({}, true, "User not available")

        const story = await Story.findOne({ _id: storyID })

        let viewed 
        if (!story.view.includes(userID)) {
            viewed = await Story.findByIdAndUpdate({ _id: storyID }, { $push: { view: userID}} )
        } 

        return viewed
    } catch (error) {
        throw new Error(error.toString());
    }
}

export default {
    getAllStories,
    uploadVideo,
    deleteStory,
    getStoryDetail,
    likeOrUnlikeStory,
    viewStory,
}
