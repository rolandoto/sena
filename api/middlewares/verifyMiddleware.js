const jwt = require("jsonwebtoken");
require("dotenv").config();

const verify = {
    verifyMiddleware,
};

function verifyMiddleware(req, res, next) {
    const token = req.headers["x-access-token"];
    if (token) {
        const verifyToken = jwt.verify(token, process.env.SECRECT_KEY_TOKEN);
        if (verifyToken) {
            req.userID = verifyToken;
            req.userToken = token;
            next();
        } else {
            return res.json({
                status: false,
                errorText: "token",
                message: "Invalid token",
            });
        }
    } else {
        return res.json({
            status: false,
            errorText: "token",
            message: "Invalid token",
        });
    }
}

module.exports = verify;
