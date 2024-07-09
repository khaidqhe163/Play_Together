import express from 'express';
import DonateController from '../controllers/DonateController.js';

const DonateRouter = express.Router();

DonateRouter.post('/', DonateController.createDonate);

export default DonateRouter;
