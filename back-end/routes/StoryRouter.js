import express from 'express';
import {StoryController} from '../controllers/index.js';


const StoryRouter = express.Router();

// Story routes
StoryRouter.get('/', StoryController.getStories);



export default StoryRouter;
