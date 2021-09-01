const express = require("express");
const router = express.Router();
const { verifyMiddleware } = require("../middlewares/verifyMiddleware");
const {
    getFields,
    createTemplate,
    getTemplates,
    updateTemplate,
    deleteTemplate,
    getTemplate,
} = require("../controllers/templateController");

router
    .get("/getFields/:type", verifyMiddleware, getFields)
    .get("/getTemplates", verifyMiddleware, getTemplates)
    .get("/getTemplate/:id", verifyMiddleware, getTemplate)
    .post("/createTemplate", verifyMiddleware, createTemplate)
    .put("/updateTemplate", verifyMiddleware, updateTemplate)
    .delete("/deleteTemplate", verifyMiddleware, deleteTemplate);

module.exports = router;
