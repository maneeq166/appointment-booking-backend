const { createSlotController } = require("../../controller/slots");
const { authMiddleware } = require("../../middleware/authMiddleware");

const router = require("express").Router();

router.post("/create-slot",authMiddleware,createSlotController);

module.exports = router;
