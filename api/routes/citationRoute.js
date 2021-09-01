const express = require("express");
const router = express.Router();
const { verifyMiddleware } = require("../middlewares/verifyMiddleware");
const { generateCitation } = require("../controllers/generatePDFController");
const {
    getCitations,
    getSelectedCitation,
    uploadNewCitationStatus,
    sendCitation,
} = require("../controllers/citationController");
const upload = require("../controllers/uploads/pdfControllerUpload");

router
    .post("/sendCitation", verifyMiddleware, sendCitation)
    .post("/generateCitation", verifyMiddleware, generateCitation)
    .post("/getCitations", verifyMiddleware, getCitations)
    .post("/getSelectedCitation", verifyMiddleware, getSelectedCitation)
    .post(
        "/uploadNewCitationStatus",
        verifyMiddleware,
        upload.single("newFileToUpload"),
        uploadNewCitationStatus
    );

module.exports = router;
