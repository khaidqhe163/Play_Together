import express from 'express'
import { HomeController } from '../controllers/index.js';
const router = express.Router();

router.get('/', HomeController.testHome)

export default router;