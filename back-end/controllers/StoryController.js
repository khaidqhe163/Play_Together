import { StoryService } from "../services/index.js";

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

export default {
    getStories
}
