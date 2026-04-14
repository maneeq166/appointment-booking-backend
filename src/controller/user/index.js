const apiResponse = require("../../utils/apiResponse");
const {asyncHandler} = require("../../utils/asyncHandler");
const {registerService, loginPhoneService, loginEmailService, registerProviderService} = require("../../service/index");

exports.registerController = asyncHandler(async(req,res)=>{
    const {firstName,lastName,password,location,phoneNo,emailAddress,role} = req.body;
    const {data,message,statusCode} = await registerService({firstName,lastName,password,location,phoneNo,emailAddress,role});
    return res.status(statusCode).json(new apiResponse(statusCode,data,message));
})

exports.loginPhoneNoController = asyncHandler(async(req,res)=>{
    const {phoneNo,password} = req.body;
    const {data,message,statusCode}= await loginPhoneService({phoneNo,password});
    return res.status(statusCode).json(new apiResponse(statusCode,data,message));
})

exports.loginEmailController = asyncHandler(async(req,res)=>{
    const {emailAddress,password} = req.body;
    const {data,message,statusCode} = await loginEmailService({emailAddress,password});
    return res.status(statusCode).json(new apiResponse(statusCode,data,message));
})

exports.registerProviderController = asyncHandler(async(req,res)=>{
    const {firstName,lastName,password,location,phoneNo,emailAddress,role} = req.body;
    const admin = req.role;
    const {data,message,statusCode} = await registerProviderService({firstName,lastName,password,location,phoneNo,emailAddress,role,admin});
    return res.status(statusCode).json(new apiResponse(statusCode,data,message));
})

