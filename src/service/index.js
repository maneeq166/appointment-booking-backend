const User = require("../models/users/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config/env")
exports.registerService = async({firstName,lastName,password,location,phoneNo,emailAddress,role="user"}) => {
    if(!firstName || !lastName || !password || !location || !phoneNo || !emailAddress || !role) {
        return {
            data:null,
            message:"Required fields are missing",
            statusCode:400
        }
    }

    const userExists = await Promise.all([
        User.findOne({phoneNo}),
        User.findOne({emailAddress})
    ]);

    if(!userExists){
        return {
            data:null,
            message:"Something went wrong",
            statusCode:400
        }
    }

    const hashedPassword = bcrypt.hash(password,10);

    const user = await User.create({
        firstName,
        lastName,
        password:hashedPassword,
        location,
        phoneNo,
        emailAddress,
        role
    });

    return {
        data:{firstName:user.firstName , lastName: user.lastName},
        message:"Registration Successfull",
        statusCode:201
    }
}

exports.loginPhoneService = async ({phoneNo,password}) =>{
    if(!phoneNo||!password){
        return {
            data:null,
            message:"Required fields are missing",
            statusCode:400
        }
    }

    const user = await User.findOne({phoneNo});

    if(!user){
        return {
            data:null,
            message:"User does not exist",
            statusCode:400
        }
    }

    const comparePassword = await bcrypt.compare(password,user.password);
    if(!comparePassword){
        return {
            data:null,
            message:"Something went wrong",
            statusCode:400
        }
    }

    const token = jwt.sign({id:user._id,phoneNo:user.phoneNo},JWT_SECRET);

    return {
        data:token,
        message:"Login Successfull",
        statusCode:200
    }
}

exports.loginEmailService = async ({emailAddress,password})=>{
    if(!emailAddress||!password){
        return {
            data:null,
            message:"Required fields are missing",
            statusCode:400
        }
    }

    const user = await User.findOne({emailAddress});

    if(!user){
        return {
            data:null,
            message:"User does not exist",
            statusCode:400
        }
    }

    const comparePassword = await bcrypt.compare(password,user.password);
    if(!comparePassword){
        return {
            data:null,
            message:"Something went wrong",
            statusCode:400
        }
    }

    const token = jwt.sign({id:user._id,emailAddress:user.emailAddress},JWT_SECRET);

    return {
        data:token,
        message:"Login Successfull",
        statusCode:200
    }
}


