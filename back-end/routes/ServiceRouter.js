import express from 'express'
import { ServiceController } from '../controllers/index.js';
import jwt from '../middleware/jwt.js';

const ServiceRouter = express.Router();

ServiceRouter.get('/', ServiceController.getAllService);
ServiceRouter.post('/', ServiceController.createService);


ServiceRouter.get('/test', jwt.verifyAccessToken, ServiceController.getAllService);
export default ServiceRouter;