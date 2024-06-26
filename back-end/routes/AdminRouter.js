import express from 'express';
import AdminController from '../controllers/AdminController.js';

const AdminRouter = express.Router();

AdminRouter.post('/login', AdminController.login);

export default AdminRouter;
