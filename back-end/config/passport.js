import ggPassport from 'passport-google-oauth20'
import fbPassport from 'passport-facebook'
import passport from 'passport';
import { UserService } from '../services/index.js';
var GoogleStrategy = ggPassport.Strategy;
var FacebookStrategy = fbPassport.Strategy;
passport.use(new GoogleStrategy({
    clientID: "637907956309-8ousuj5t1d713m0k6vu6fjua9jonpr15.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "/api/user/auth/google/callback"
},
    async function (accessToken, refreshToken, profile, cb) {
        await UserService.addSocialAccount(profile);
        return cb(null, profile)
    }
));

passport.use(new FacebookStrategy({
    clientID: "952904133204970",
    clientSecret: "8af3b238dfd04c670f443d82abb6ed80",
    callbackURL: "/api/user/auth/facebook/callback",
    profileFields: ['id', 'emails', 'name']
},
    async function (accessToken, refreshToken, profile, cb) {
        console.log(profile);
        // await UserService.addSocialAccount(profile);
        return cb(null, profile);
    }
));