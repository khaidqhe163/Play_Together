import jwt from 'jsonwebtoken';
function signAccessToken(user) {
    const payload = {
        email: user.email,
        username: user.username
    };
    const secret = process.env.PRIVATE_KEY;
    // console.log(secret);
    const options = {
        expiresIn: "60s",
        audience: user.id.toString()
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
    console.log(cookies);
    if (!cookies || !cookies.jwt) {
        // console.log("Your login session has expired1111!");
        return res.status(401).json({
            message: "Your login session has expired!"
        })
    }
    const accessToken = cookies.jwt;
    jwt.verify(accessToken, process.env.PRIVATE_KEY, (err, payload) => {
        if (err) {
            res.status(401).json({
                message: "Your login session has expired!"
            })
        }
        req.payload = payload;
        next();
    })
}
export default {
    signAccessToken,
    autoLogin
}