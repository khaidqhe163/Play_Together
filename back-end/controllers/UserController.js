import { UserService } from "../services/index.js"
import jwt from '../middleware/jwt.js';
import bcrypt from 'bcryptjs'
const register = async (req, res) => {
    try {
        const {
            email,
            username,
            dob,
            gender,
            password
        } = req.body;
        const existEmail = await UserService.findUserByEmail(email);
        if (existEmail) {
            return res.status(400).json({
                message: "Your email has registered!"
            })
        }
        await UserService.register(email, username, dob, gender, password);
        res.status(201).json({
            message: "Register successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        });
    }
}

const login = async (req, res) => {
    try {
        const user = await UserService.findUserByEmail(req.body.email);
        if (!user) {
            return res.status(401).json({
                message: "Wrong email"
            })
        }
        const hashPassword = bcrypt.compareSync(req.body.password, user.password);
        if (!hashPassword) {
            return res.status(401).json({
                message: "Wrong password"
            })
        }
        const token = jwt.signAccessToken({ id: user._id, email: user.email, username: user.username });
        const { password, ...returnUser } = user;
        res.cookie("jwt", token, { maxAge: 60000, httpOnly: true });
        res.status(200).json({
            user: returnUser,
            accessToken: token
        })
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        })
    }
}

const autoLogin = async (req, res) => {
    try {
        console.log(req.cookies);
        const user = await UserService.autoLogin(req.payload.email);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        })
    }
}

const loginPassport = async (req, res) => {
    try {
        let token = req.body.token;
        token = atob(token);
        const tokenElements = token.split(":");
        if (tokenElements[1] < Date.now() - 5 * 1000) {
            throw new Error("Token is expired!");
        }
        console.log(tokenElements);
        const user = await UserService.autoLogin(tokenElements[0]);
        res.cookie("jwt", user.accessToken, { maxAge: 60000, httpOnly: true });
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        })
    }
}
export default {
    register,
    login,
    autoLogin,
    loginPassport
}