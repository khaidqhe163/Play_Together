import jwt from 'jsonwebtoken';
function signAccessToken(user) {
    const payload = {
        email: user.email,
        id: user.id.toString()
    };
    const secret = process.env.PRIVATE_KEY;
    const options = {
        expiresIn: "1h"
    };
    let token = null;
    try {
        token = jwt.sign(payload, secret, options);
    } catch (error) {
        console.log(error.toString());
    }

    return token;
}
function autoLogin(req, res, next) {
    const cookies = req.cookies;
    if (!cookies || !cookies.RefreshToken) {
        return res.status(401).json({
            message: "Your login session has expired!"
        })
    }
    const refreshToken = cookies.RefreshToken;
    jwt.verify(refreshToken, process.env.PRIVATE_KEY_REFRESH, (err, payload) => {
        if (err) {
            res.status(401).json({
                message: "Your login session has expired!"
            })
        }
        req.payload = payload;
        const accessToken = signAccessToken(payload);
        res.cookie("AccessToken", accessToken, { maxAge: 1000 * 60 * 60, httpOnly: true });
        next();
    })
}

function autoLoginAdmin(req, res, next) {
    const cookies = req.cookies;
    if (!cookies || !cookies.RefreshAdminToken) {
        return res.status(401).json({
            message: "Your login session has expired!"
        })
    }
    const refreshToken = cookies.RefreshAdminToken;
    jwt.verify(refreshToken, process.env.PRIVATE_KEY_REFRESH, (err, payload) => {
        if (err) {
            res.status(401).json({
                message: "Your login session has expired!"
            })
        }
        req.payloadadmin = payload;
        next();
    })
}

function verifyAccessToken(req, res, next) {
    if (!req.headers['authorization'])
        return res.status(401).json({
            message: "Unauthorized"
        })

    const authHeader = req.headers['authorization'];
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];
    jwt.verify(token, process.env.PRIVATE_KEY, (err, payload) => {
        if (err) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }
        req.payload = payload;
        next();
    })
}

function signRefreshToken(user) {
    const payload = {
        email: user.email,
        id: user.id.toString()
    };
    const secret = process.env.PRIVATE_KEY_REFRESH;
    const options = {
        expiresIn: "1y"
    };
    let token = null;
    try {
        token = jwt.sign(payload, secret, options);
    } catch (error) {
        console.log(error.toString());
    }

    return token;
}

function verifyRefreshToken(req, res) {
    const token = req.body.refreshToken;
    jwt.verify(token, process.env.PRIVATE_KEY_REFRESH, (err, payload) => {
        if (err) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }
        const accessToken = signAccessToken(payload);
        return res.status(201).json({
            accessToken: accessToken
        })
    })
}
export default {
    signAccessToken,
    autoLogin,
    verifyAccessToken,
    signRefreshToken,
    verifyRefreshToken,
    autoLoginAdmin
}