const express = require("express");
const router = express.Router();
const { verifyMiddleware } = require("../middlewares/verifyMiddleware");
const {
    createMail,
    getAllMails,
    getPermits,
    getMail,
    updateMail,
    deleteMail,
} = require("../controllers/mailController");

router
    .get("/getPermits", verifyMiddleware, getPermits)
    .get("/getAllMails", verifyMiddleware, getAllMails)
    .get("/getMail/:id", verifyMiddleware, getMail)
    .post("/createMail", verifyMiddleware, createMail)
    .put("/updateMail", verifyMiddleware, updateMail)
    .delete("/deleteMail", verifyMiddleware, deleteMail);

module.exports = router;
