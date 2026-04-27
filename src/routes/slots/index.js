const { createSlotController,getSlotsController } = require("../../controller/slots");
const { authMiddleware } = require("../../middleware/authMiddleware");

const router = require("express").Router();

router.post("/create-slot",authMiddleware,createSlotController);
router.get("/read-all",authMiddleware,getSlotsController);

module.exports = router;
