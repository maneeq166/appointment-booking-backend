const apiResponse = require("../../utils/apiResponse");
const {asyncHandler} = require("../../utils/asyncHandler");
const {registerService} = require("../../service/index");

exports.registerController = asyncHandler(async(req,res)=>{
    const {firstName,lastName,password,location,phoneNo,emailAddress,role} = req.body;
    const {data,message,statusCode} = await registerService({firstName,lastName,password,location,phoneNo,emailAddress,role});
    return res.status(statusCode).json(new apiResponse(statusCode,data,message));
})

