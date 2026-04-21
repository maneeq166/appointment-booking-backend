const User = require("../../models/users/index");
const Slot = require("../../models/slots/index");
exports.createSlotService = async (providerId, startTime, endTime) => {
  if (!providerId || !startTime || !endTime) {
    return {
      data: null,
      message: "Required fields are missing",
      statusCode: 400,
    };
  }

  console.log(providerId,startTime,endTime);
  

  const user = await User.findById(providerId);

  if (!user || (user.role !== "admin" && user.role !== "provider")) {
    return {
      data: null,
      message: "Unauthorized",
      statusCode: 403,
    };
  }

  const start = new Date(startTime);
const end = new Date(endTime);

if (isNaN(start.getTime()) || isNaN(end.getTime())) {
  return {
    data: null,
    message: "Invalid date format",
    statusCode: 400,
  };
}

if (start >= end) {
  return {
    data: null,
    message: "Invalid time range",
    statusCode: 400,
  };
}

  let slot = await Slot.findOne({
    providerId,
    startTime: start,
    endTime: end,
  });

  console.log(slot);
  

  if (slot) {
    return {
      data: null,
      message: "Slot already exists",
      statusCode: 400,
    };
  }

  slot = await Slot.create({
    providerId,
    startTime: start,
    endTime: end,
    date: start, // important
    status: "available",
  });


  console.log(slot);
  

  return {
    data: slot,
    message: "Slot created successfully",
    statusCode: 201,
  };
};
