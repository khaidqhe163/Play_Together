import express from 'express'
import { ServiceController } from '../controllers/index.js';

const ServiceRouter = express.Router();

ServiceRouter.get('/',ServiceController.getAllService);
ServiceRouter.post('/',ServiceController.createService);

export default ServiceRouter;