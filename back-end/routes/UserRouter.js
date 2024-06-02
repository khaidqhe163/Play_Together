import express from 'express';
import { UserController, StoryController } from '../controllers/index.js';
import middleware from '../middleware/jwt.js';
import passport from 'passport';
import jwt from '../middleware/jwt.js';

const UserRouter = express.Router();

UserRouter.post('/register', UserController.register)
    .post('/login', UserController.login)
    .get('/autologin', middleware.autoLogin, UserController.autoLogin);

UserRouter.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'], session: false }));

UserRouter.get('/auth/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: 'http://localhost:3000/login' }),
    function (req, res) {
        let token = req.user.emails[0].value + ":" + (Date.now() + 5 * 1000);
        token = btoa(token);
        res.redirect('http://localhost:3000/login-success/' + token);
    });

UserRouter.get('/auth/facebook',
    passport.authenticate('facebook', { scope: ["email"], session: false }));

UserRouter.get('/auth/facebook/callback',
    passport.authenticate('facebook', { session: false, failureRedirect: 'http://localhost:3000/login' }),
    function (req, res) {
        let token = req.user.emails[0].value + ":" + (Date.now() + 5 * 1000);
        token = btoa(token);
        res.redirect('http://localhost:3000/login-success/' + token);
    });

UserRouter.post('/refresh-token', jwt.verifyRefreshToken);
UserRouter.post('/login-success', UserController.loginPassport);

UserRouter.post("/forgot-password", UserController.sendEmail);
UserRouter.post("/reset-password", UserController.resetPassword);
UserRouter.post("/verify-password-token", UserController.verifyToken);

UserRouter.get('/players', UserController.getAllPlayer);
UserRouter.post('/search-player', UserController.searchPlayerByCriteria);
UserRouter.post('/update-player-info', jwt.verifyAccessToken, UserController.updatePlayerInfo)
UserRouter.get('/player-information/:id', UserController.getPlayerById);
UserRouter.get('/players-by-service/:serviceId', UserController.getPlayerByServiceId);
UserRouter.put('/change-password', jwt.verifyAccessToken, UserController.changePassword);
export default UserRouter
