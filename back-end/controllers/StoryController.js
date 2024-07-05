import { StoryService } from "../services/index.js";
import { getVideoDurationInSeconds } from 'get-video-duration';
import fs from 'fs'
import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from '@ffmpeg-installer/ffmpeg'

ffmpeg.setFfmpegPath(ffmpegPath.path);
const getStories = async (req, res) => {
    try {
        const stories = await StoryService.getAllStories();
        res.status(200).json(stories);
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        });
    }
}

const createStory = async (req, res) => {
    try {
        const userId = req.payload.id;
        let video;
        await getVideoDurationInSeconds(req.file.path).then((duration) => {
            video = duration;
        })
        if (video > 60) {
            fs.unlinkSync(req.file.path);
            throw new Error('The video is longer than the allowed length!');
        }
        const thumbnailName = "public\\thumbnail\\" + userId + Date.now() + ".png";
        generateThumbnail(req.file.path, 'public/thumbnail', userId + Date.now() + ".png");
        const story = await StoryService.uploadVideo(userId, req.file.path, thumbnailName, req.body.text);
        res.status(200).json({
            message: 'successfully',
            data: story
        })
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        })
    }
}

function generateThumbnail(videoPath, thumbnailPath, thumbnailName) {
    ffmpeg(videoPath)
        .takeScreenshots({
            timemarks: ["5"],
            filename: thumbnailName,
            folder: thumbnailPath,
            count: 1,
            size: '280x500'
        })
        .on('end', function () {
            console.log('Thumbnail generated successfully');
        })
        .on('error', function (err) {
            console.error('Error generating thumbnail: ' + err.message);
        });
}

const getStoryDetail = async (req, res) => {
    const { id } = req.params;
    try {
      const story = await StoryService.getStoryDetail(id);
      res.status(200).json(story);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

const likeOrUnlikeStory = async (req, res) => {
    try {
        const userID = req.payload.id 
        const storyID = req.params.id
        const story = await StoryService.likeOrUnlikeStory(userID, storyID);
        res.status(200).json(story);
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        });
    }
}

const viewStory = async (req, res) => {
    try {
        const userID = req.payload.id 
        const storyID = req.params.id
        const story = await StoryService.viewStory(userID, storyID);
        res.status(200).json(story);
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        });
    }
}

export default {
    getStories,
    createStory,
    getStoryDetail,
    likeOrUnlikeStory,
    viewStory,
}
