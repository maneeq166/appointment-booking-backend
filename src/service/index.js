const User = require("../models/users/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config/env").secrets.JWT_SECRET;
exports.registerService = async({firstName,lastName,password,location,phoneNo,emailAddress,role="user"}) => {
    if(!firstName || !lastName || !password || !location || !phoneNo || !emailAddress || !role) {
        return {
            data:null,
            message:"Required fields are missing",
            statusCode:400
        }
    }

    if(role!=="user"){
        return {
            data:null,
            message:"Register as user,bro!!!",
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

    const hashedPassword = await bcrypt.hash(password,10);

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

    
    
    
    const token = jwt.sign({id:user._id,role:user.role},JWT_SECRET);

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

    const token = jwt.sign({id:user._id,role:user.role},JWT_SECRET);

    return {
        data:token,
        message:"Login Successfull",
        statusCode:200
    }
}

exports.registerProviderService = async ({
  firstName,
  lastName,
  password,
  location,
  phoneNo,
  emailAddress,
  admin
}) => {

  if (!firstName || !lastName || !password || !location || !phoneNo || !emailAddress) {
    return {
      data: null,
      message: "Required fields are missing",
      statusCode: 400
    };
  }

  if (admin !== "admin") {
    return {
      data: null,
      message: "Access Denied",
      statusCode: 403
    };
  }

  const [userPhone, userEmail] = await Promise.all([
    User.findOne({ phoneNo }),
    User.findOne({ emailAddress })
  ]);

  if (userPhone || userEmail) {
    return {
      data: null,
      message: "User already exists",
      statusCode: 400
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const provider = await User.create({
    firstName,
    lastName,
    password: hashedPassword,
    location,
    phoneNo,
    emailAddress,
    role: "provider"
  });

  return {
    data: {
      id: provider._id,
      firstName: provider.firstName,
      lastName: provider.lastName,
      emailAddress: provider.emailAddress
    },
    message: "Provider Registered Successfully",
    statusCode: 201
  };
};

