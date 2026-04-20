const User = require("../../models/users/index");
const Slot = require("../../models/slots/index");
exports.createSlotService = async (
  providerId,
  startTime,
  endTime,
  available,
  role,
) => {
  if (!providerId || !startTime || !endTime || !available || !role) {
    return {
      data: null,
      message: "Required fields are missing",
      statusCode: 400,
    };
  }

  if (role !== "admin" && role !== "provider") {
    return {
      data: null,
      message: "Not Correct role",
      statusCode: 400,
    };
  }

  const user = await User.findById(providerId);
  if (!user || user.role !== "admin" || user.role !== "provider") {
    return {
      data: null,
      message: "Something went wrong",
      statusCode: 400,
    };
  }

  let slot = await Slot.findOne({
    startTime,
    endTime,
  });

  if (slot) {
    return {
      data: null,
      message: "Slot already exists",
      statusCode: 400,
    };
  }

  slot = await Slot.create({
    providerId,
    startTime,
    endTime,
    available: true,
    date: new Date(),
  });

  return {
    data: slot,
    message: "Slot created successfully",
    statusCode: 201,
  };
};
