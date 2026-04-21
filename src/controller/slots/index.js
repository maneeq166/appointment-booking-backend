const { createSlotService } = require("../../service/slots/index");
const ApiResponse = require("../../utils/apiResponse");
const apiResponse = require("../../utils/apiResponse");
const { asyncHandler } = require("../../utils/asyncHandler");

exports.createSlotController = asyncHandler(async (req, res) => {
  const providerId = req.id;
  const { startTime, endTime } = req.body;
  const { data, message, statusCode } = await createSlotService(
    providerId,
    startTime,
    endTime,
  );

  return res
    .status(statusCode)
    .json(new ApiResponse(statusCode, data, message));
});
