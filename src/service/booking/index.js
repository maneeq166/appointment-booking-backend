const Booking = require("../../models/booking/index");
const Slot = require("../../models/slots/index");

exports.bookSlotServices = async (userId,slotId) =>{
  if(!userId || !slotId){
    return {
      data: null,
      message: "Required fields are missing",
      statusCode: 400,
    };
  }

  const slot = await Slot.findById(slotId);
  if(!slot){
    return {
      data: null,
      message: "Slot not found",
      statusCode: 404,
    };
  }

  const booking = await Booking.create({
    slotId,
    providerId:slot.providerId,
    userId,
  });

  return {
    data:booking,
    message:"Booking created successfully",
    statusCode:201
  }
}
