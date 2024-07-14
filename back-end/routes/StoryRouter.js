import express from 'express';
import { StoryController } from '../controllers/index.js';
import multer from 'multer';
import jwt from '../middleware/jwt.js';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/stories/')
    },
    filename: function (req, file, cb) {
        cb(null, req.payload.id + Date.now() + file.originalname);
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 20
    }
})

const StoryRouter = express.Router();

// Story routes
StoryRouter.get('/', StoryController.getStories);
StoryRouter.post('/create-story', jwt.verifyAccessToken, upload.single("video"), StoryController.createStory);
StoryRouter.delete('/:id', jwt.verifyAccessToken, StoryController.deleteStory);
StoryRouter.get('/:id', StoryController.getStoryDetail);
StoryRouter.post('/likedOrUnlikedStory/:id', jwt.verifyAccessToken, StoryController.likeOrUnlikeStory);
StoryRouter.post('/viewStory/:id', jwt.verifyAccessToken, StoryController.viewStory);

StoryRouter.get('/user/:userId', StoryController.getUserStories);

StoryRouter.put('/banOrUnbanStory', StoryController.banOrUnbanStory);


export default StoryRouter;
