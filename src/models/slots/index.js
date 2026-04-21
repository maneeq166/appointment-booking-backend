const mongoose = require("mongoose");

const slotSchema = mongoose.Schema(
  {
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    date: { type: Date, required: true },
    startTime: { type: Date, required: true ,unique:true },
    endTime: { type: Date, required: true ,unique:true},
    status: {
  type: String,
  enum: ["available", "booked"],
  default: "available"
},
  },
  { timestamps: true },
);

const Slot = mongoose.model("slot", slotSchema);
module.exports = Slot;
