const express = require("express");
const router = express.Router();
const upload = require("../controllers/uploads/xmlControllerUpload");
const { verifyMiddleware } = require("../middlewares/verifyMiddleware");
const {
    uploadInstructors,
    searchInstructor,
    searchInstructors,
} = require("../controllers/instructorController");

router
    .post("/uploadInstructors", verifyMiddleware, upload.single("fileUpload"), uploadInstructors)
    .post("/searchInstructor", verifyMiddleware, searchInstructor)
    .post("/searchInstructors", verifyMiddleware, searchInstructors);

module.exports = router;
