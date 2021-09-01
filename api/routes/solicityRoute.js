const express = require("express");
const router = express.Router();
const { verifyMiddleware } = require("../middlewares/verifyMiddleware");
const {
    getMotiverOrProhibitions,
    getDrawSolicity,
    saveMotiveOrProhibition,
    saveSolicity,
    getSolicities,
    changeSolicityStatus,
    getSolicityDetails,
    updateMotiveOrProhibition,
    deleteMotiveOrProhibition,
    uploadSolicityFiles,
    getMotiverOrProhibition,
} = require("../controllers/solicityController");
const uploadSolicities = require("../controllers/uploads/solicityUploadFiles");

router
    .get("/getDrawSolicity", verifyMiddleware, getDrawSolicity)
    .get("/getSolicities", verifyMiddleware, getSolicities)
    .get("/getSolicityDetails/:id", verifyMiddleware, getSolicityDetails)
    .get("/getMotiverOrProhibitions", verifyMiddleware, getMotiverOrProhibitions)
    .get("/getMotiveOrProhibition/:id", verifyMiddleware, getMotiverOrProhibition)
    .post("/saveMotiveOrProhibition", verifyMiddleware, saveMotiveOrProhibition)
    .post("/saveSolicity", verifyMiddleware, saveSolicity)
    .post(
        "/uploadNewFileSolicity",
        verifyMiddleware,
        uploadSolicities.any("fileUpload"),
        uploadSolicityFiles
    )
    .put("/changeSolicityStatus", verifyMiddleware, changeSolicityStatus)
    .put("/updateMotiveOrProhibition", verifyMiddleware, updateMotiveOrProhibition)
    .delete("/deleteMotiveOrProhibition", verifyMiddleware, deleteMotiveOrProhibition);

module.exports = router;
