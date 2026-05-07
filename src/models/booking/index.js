const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    slotId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"slot",
        required:true,
    },
    providerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },
    date:{required:true,type:Date},
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },
    status: {
  type: String,
  enum: [
    "booked",
    "cancelled",
    "completed",
    "no-show"
  ],
  default: "booked"
}
},{timestamps:true});

const Booking = mongoose.model("booking",BookingSchema);
module.exports=Booking;