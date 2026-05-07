const {asyncHandler} = require("../../utils/asyncHandler/index");
const ApiResponse = require("../../utils/apiResponse/index");
const { bookSlotServices, readBookedSlots } = require("../../service/booking");

exports.bookSlotController = asyncHandler(async(req,res)=>{
    const userId = req.id;
    const {slotId} = req.body;
    const {data,message,statusCode} = await bookSlotServices(userId,slotId);
    return res.status(statusCode).json(new ApiResponse(statusCode,data,message))
});

exports.readBookingController = asyncHandler(async(req,res)=>{
    const userId = req.id;
    const {date,status} = req.query;
    const {data,message,statusCode} = await readBookedSlots(userId,date,status);
    return res.status(statusCode).json(new ApiResponse(statusCode,data,message))
});


