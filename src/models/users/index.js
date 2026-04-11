const mongoose = require('mongoose');

const { body } = require("express-validator");

const userSchema = mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    password:{type:String,required:true},
    location:{
        fullAddress:{type:String,required:true},
        colony:{type:String},
        city:{type:String,required:true},
        pincode:{type:String,required:true},
        country:{type:String,required:true}
    },
    phoneNo:{type:Number,required:true},
    emailAddress:{type:String,required:true},
    role:{type:String,enum:["admin","provider","user"]}
})

const User = mongoose.model("user",userSchema);



module.exports = User;

