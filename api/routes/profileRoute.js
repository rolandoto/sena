const express = require("express");
const router = express.Router();
const upload = require("../controllers/uploads/imageController");
const { verifyMiddleware } = require("../middlewares/verifyMiddleware");
const { editProfile, profileUpdated } = require("../controllers/profileController");

router
    .post("/editProfile", verifyMiddleware, upload.single("imageProfile"), editProfile)
    .post("/profileUpdated", verifyMiddleware, profileUpdated);

module.exports = router;
