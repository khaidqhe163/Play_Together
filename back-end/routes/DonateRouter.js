import express from 'express';
import DonateController from '../controllers/DonateController.js';

const DonateRouter = express.Router();

DonateRouter.post('/', DonateController.createDonate);
DonateRouter.post('/getAll', DonateController.getAll);
DonateRouter.get('/top-donors/:period', DonateController.getTopDonorsByPeriod);

export default DonateRouter;
