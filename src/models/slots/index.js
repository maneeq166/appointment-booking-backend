const mongoose = require("mongoose");

const slotSchema = mongoose.Schema(
  {
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    date: { type: Date, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    available: { type: Boolean, required: true, default: true },
  },
  { timestamps: true },
);

const Slot = mongoose.model("slot", slotSchema);
module.exports = Slot;
