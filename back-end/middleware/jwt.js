import jwt from 'jsonwebtoken';
function signAccessToken(userId) {
    const payload = {};
    const secret = process.env.PRIVATE_KEY;
    const options = {
        expiresIn: "1h",
        audience: userId
    };
    const token = null;
    try {
        token = jwt.sign(payload, secret, options);
    } catch (error) {
        console.log(error.toString());
    }

    return token;
}

export default {
    signAccessToken
}