import express from 'express'
import { UserController } from '../controllers/index.js';
import middleware from '../middleware/jwt.js'
import passport from 'passport';

const UserRouter = express.Router();

UserRouter.post('/register', UserController.register)
    .post('/login', UserController.login)
    .get('/autologin', middleware.autoLogin, UserController.autoLogin)


UserRouter.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'], session: false }));

UserRouter.get('/auth/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: 'http://localhost:3000/login' }),
    function (req, res) {
        console.log(Date.now());
        let token = req.user.emails[0].value + ":" + (Date.now() + 5 * 1000);
        token = btoa(token);
        res.redirect('http://localhost:3000/login-success/' + token);
    });


UserRouter.get('/auth/facebook',
    passport.authenticate('facebook', { scope: ["email"], session: false }));

UserRouter.get('/auth/facebook/callback',
    passport.authenticate('facebook', { session: false, failureRedirect: 'http://localhost:3000/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        console.log(Date.now());
        let token = req.user.emails[0].value + ":" + (Date.now() + 5 * 1000);
        token = btoa(token);
        res.redirect('http://localhost:3000/login-success/' + token);
    });

UserRouter.post('/login-success', UserController.loginPassport);

export default UserRouter