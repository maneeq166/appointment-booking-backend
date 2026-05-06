const router = require("express").Router();
const { bookSlotController } = require("../../controller/booking/index");
const { authMiddleware } = require("../../middleware/authMiddleware");

router.post("/book-slot",authMiddleware,bookSlotController);

module.exports=router;
