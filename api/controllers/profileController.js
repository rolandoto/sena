const User = require("../models/User");
const profileMethods = {};
const domain = require("../config/domain");

async function verifyUsername(user) {
    const searchUser = await User.findOne({ username: user });
    if (searchUser) {
        return true;
    } else {
        return false;
    }
}

async function verifyEmail(email) {
    const searchEmail = await User.findOne({ email: email });
    if (searchEmail) {
        return true;
    } else {
        return false;
    }
}

profileMethods.editProfile = async (req, res, err) => {
    const userID = req.userID;
    const { firstName, lastName, username, email } = req.body;
    const searchUser = await User.findById(userID);
    if (searchUser) {
        if (username !== searchUser.username) {
            const verifyUser = await verifyUsername(username);
            if (verifyUser) {
                return res.json({
                    status: false,
                    errorText: "user",
                    message: "El usuario ya se encuentra en uso",
                });
            } else {
                const updateUsername = await searchUser.update({
                    username: username,
                });
                if (!updateUsername) {
                    return res.json({
                        status: false,
                        errorText: "update",
                        message: "Hubo un error al actualizar tus datos",
                    });
                }
            }
        }

        if (email !== searchUser.email) {
            const verifyMail = await verifyEmail(email);
            if (verifyMail) {
                return res.json({
                    status: false,
                    errorText: "email",
                    message: "El email ya se encuentra en uso",
                });
            } else {
                const updateEmail = await searchUser.update({
                    email: email,
                });
                if (!updateEmail) {
                    return res.json({
                        status: false,
                        errorText: "update",
                        message: "Hubo un error al actualizar tus datos",
                    });
                }
            }
        }

        if (req.file) {
            await searchUser.update({
                profilePicture: domain + "img/" + req.file.filename,
            });
        }

        const updateUser = await searchUser.update({
            first_name: firstName,
            last_name: lastName,
        });

        if (updateUser) {
            return res.json({
                status: true,
                errorText: "update",
                message: "Tus datos fueron actualizados correctamente",
            });
        } else {
            return res.json({
                status: false,
                errorText: "noChange",
                message: "No hay cambios",
            });
        }
    } else {
        return res.json({
            status: false,
            errorText: "token",
            message: "User don't find",
        });
    }
};

profileMethods.profileUpdated = async (req, res) => {
    const userID = req.userID;
    if (userID) {
        const userInfo = await User.findOne(
            { _id: userID },
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
            token: req.userToken,
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
};

module.exports = profileMethods;
