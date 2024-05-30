import express from 'express';
import {StoryController} from '../controllers/index.js';
import multer from 'multer';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/stories/')
    },
    filename: function (req, file, cb) {
        cb(null, "6651f21e079075c8a3da9d02" + Date.now() + file.originalname);
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

StoryRouter.post('/create-story', upload.single("video"), StoryController.createStory)

StoryRouter.get('/:id', StoryController.getStoryDetail);



export default StoryRouter;
