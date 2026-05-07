const router = require("express").Router();
const { bookSlotController, readBookingController } = require("../../controller/booking/index");
const { authMiddleware } = require("../../middleware/authMiddleware");

router.post("/book-slot",authMiddleware,bookSlotController);
router.get("/read-booking",authMiddleware,readBookingController);

module.exports=router;
