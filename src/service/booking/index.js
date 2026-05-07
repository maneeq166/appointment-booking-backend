const Booking = require("../../models/booking/index");
const Slot = require("../../models/slots/index");
const User = require("../../models/users/index");

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

  const date = slot.date;

  const booking = await Booking.create({
    slotId,
    date,
    providerId:slot.providerId,
    userId,
  });

  return {
    data:booking,
    message:"Booking created successfully",
    statusCode:201
  }
}

exports.readBookedSlots = async(userId,date,status) =>{
  if(!userId){
    return {
      data:null,
      message:"User ID is required",
      statusCode:400
    }
  }

  const user = await User.findById(userId);

  if(user.role==="user"){
    return {
      data:null,
      message:"Not Authorized",
      statusCode:403
    }
  }

  let query={};

  if(date){
    const selectedDate = new Date(date);

    if(isNaN(selectedDate.getTime())){
      return {
        data:null,
        message:"Invalid date format",
        statusCode:400
      }
    }

    const startOfDay = new Date(selectedDate);
    startOfDay.setHours(0, 0, 0, 0);

    // End of day
    const endOfDay = new Date(selectedDate);
    endOfDay.setHours(23, 59, 59, 999);

    query.date = {
      $gte: startOfDay,
      $lte: endOfDay,
    };
  }

  if(status){
    query.status=status;
  }

  const bookings = query?await Booking.find(query).sort({date:1}):await Booking.find();

  return {
    data:bookings,
    message:"Booking retrieved successfully",
    statusCode:200
  }
}