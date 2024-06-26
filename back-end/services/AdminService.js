import Admin from '../models/Admin.js';
import bcrypt from 'bcryptjs';
import jwt from '../middleware/jwt.js';

const findAdminByEmail = async (email) => {
    try {
        const admin = await Admin.findOne({ email: email }).exec();
        return admin;
    } catch (error) {
        throw new Error(error.toString());
    }
};

const loginAdmin = async (email, password) => {
    try {
        const admin = await findAdminByEmail(email);
        if (!admin) {
            throw new Error("Wrong email");
        }
        const isPasswordMatch = bcrypt.compareSync(password, admin.password);
        if (!isPasswordMatch) {
            throw new Error("Wrong password");
        }
        const accessToken = jwt.signAccessToken({ id: admin._id, email: admin.email, username: admin.username });
        const refreshToken = jwt.signRefreshToken({ id: admin._id, email: admin.email, username: admin.username });
        const { password: pwd, ...returnAdmin } = admin._doc;
        return {
            admin: returnAdmin,
            accessToken: accessToken,
            refreshToken: refreshToken
        };
    } catch (error) {
        throw new Error(error.toString());
    }
};

export default {
    findAdminByEmail,
    loginAdmin
};
