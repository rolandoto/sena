const express = require("express");
const router = express.Router();
const { verifyMiddleware } = require("../middlewares/verifyMiddleware");
const {
    register,
    getRoleInfo,
    searchUsers,
    searchUser,
    editUserSearch,
    updatePassword
} = require("../controllers/userController");

router
    .post("/register", verifyMiddleware, register)
    .post("/getRoleInfo", verifyMiddleware, getRoleInfo)
    .post("/searchUsers", verifyMiddleware, searchUsers)
    .post("/searchUser", verifyMiddleware, searchUser)
    .post("/editUser", verifyMiddleware, editUserSearch)
    .post("/updatePassword", verifyMiddleware, updatePassword)

module.exports = router;
