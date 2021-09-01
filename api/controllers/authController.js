const authMethods = {};
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

async function searchUsernameOrEmail(username, type) {
    switch (type) {
        case "email":
            return User.findOne({ email: username });
        case "user":
            return User.findOne({ username: username });
        default:
            return false;
    }
}

async function validatePassword(password, userModel) {
    const validatePass = await userModel.confirmPassword(password);
    if (validatePass) {
        return true;
    } else {
        return false;
    }
}

authMethods.login = async (req, res) => {
    const { usernameoremail, password, type } = req.body;
    const validateUserOrEmail = await searchUsernameOrEmail(usernameoremail, type);
    if (validateUserOrEmail) {
        const validate = await validatePassword(password, validateUserOrEmail);
        
        if (validate) {
            const token = jwt.sign(
                validateUserOrEmail._id.toString(),
                process.env.SECRECT_KEY_TOKEN
            );
            if (token) {
                const userInfo = await User.findOne(
                    { _id: validateUserOrEmail._id },
                    {
                        username: true,
                        email: true,
                        user_role: true,
                        first_name: true,
                        last_name: true,
                        profilePicture: true,
                    }
                );
                setTimeout((_) => {
                    return res.json({
                        auth: true,
                        token: token,
                        userInfo: userInfo,
                        message: "Valid credentials",
                    });
                }, 1500);
            } else {
                return res.json({
                    auth: false,
                    token: null,
                    message: "Invalid credentials",
                });
            }
        } else {
            return res.json({
                auth: false,
                token: null,
                message: "El usuario y/o la contraseña son incorrectos.",
            });
        }
    } else {
        return res.json({
            auth: false,
            token: null,
            message: "El usuario y/o la contraseña son incorrectos.",
        });
    }
};

authMethods.validateToken = async (req, res) => {
    const token = req.headers["x-access-token"];
    if (token) {
        const validate = jwt.verify(token, process.env.SECRECT_KEY_TOKEN);
        if (validate) {
            const userInfo = await User.findOne(
                { _id: validate },
                {
                    username: true,
                    email: true,
                    user_role: true,
                    first_name: true,
                    last_name: true,
                    profilePicture: true,
                }
            );
            return res.json({
                auth: true,
                token: token,
                userInfo: userInfo,
                message: "Valid credentials",
            });
        } else {
            return res.json({
                auth: false,
                token: null,
                message: "Invalid credentials",
            });
        }
    } else {
        return res.json({
            auth: false,
            token: null,
            message: "Invalid credentials",
        });
    }
};

module.exports = authMethods;
