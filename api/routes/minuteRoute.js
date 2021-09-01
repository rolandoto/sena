const express = require("express");
const router = express.Router();
const { verifyMiddleware } = require("../middlewares/verifyMiddleware");
const { getAttendees } = require("../controllers/minuteController");
const { generateMinute } = require("../controllers/generatePDFController");

router
    .get("/getAttendees/:id", verifyMiddleware, getAttendees)
    .post("/generateMinute", verifyMiddleware, generateMinute);

module.exports = router;
