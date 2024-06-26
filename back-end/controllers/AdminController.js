import AdminService from '../services/AdminService.js';

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await AdminService.loginAdmin(email, password);
        res.cookie("RefreshToken", result.refreshToken, { maxAge: 1000 * 60 * 60 * 24 * 360, httpOnly: true });
        res.cookie("AccessToken", result.accessToken, { maxAge: 1000 * 60 * 60, httpOnly: true });
        res.status(200).json({
            admin: result.admin,
            accessToken: result.accessToken,
            refreshToken: result.refreshToken
        });
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        });
    }
};

export default {
    login
};
