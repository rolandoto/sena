const express = require("express");
const router = express.Router();
const { login, validateToken } = require("../controllers/authController");

router
    .post("/login", login)
    .post("/validateToken", validateToken);

module.exports = router;
