const express = require("express");
const router = express.Router();
const { verifyMiddleware } = require("../middlewares/verifyMiddleware");
const {
    getAllRols,
    addNewRol,
    getRolsCapacities,
    updateRol,
    deleteRol,
    getRoleInfo
} = require("../controllers/rolController");

router
    .get("/getRolCapacities", verifyMiddleware, getRolsCapacities)
    .get("/getAllRols", verifyMiddleware, getAllRols)
    .get("/getRolInfo/:id", verifyMiddleware, getRoleInfo)
    .post("/addRol", verifyMiddleware, addNewRol)
    .put("/updateRol", verifyMiddleware, updateRol)
    .delete("/deleteRol", verifyMiddleware, deleteRol);

module.exports = router;
