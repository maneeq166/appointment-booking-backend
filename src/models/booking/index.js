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
    cancelled:{type:Boolean,default:false},
    accepted:{type:Boolean,default:false},
},{timestamps:true});

const Booking = mongoose.model("booking",BookingSchema);
module.exports=Booking;