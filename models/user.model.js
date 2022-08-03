/**
 * Here to make the schema of the user model 
 * 
*/


const mongoose = require('mongoose');

const user_schema = new mongoose.Schema({

    name: {type: String,required: true},
    userId: {type: String, required: true,unique: true},
    email: {
        type: String, required: true,
        unique: true, minlength: 10,lowercase: true
    },
    password : {
        type: String, required: true,
    },
    userType:{
        type : String, 
        required: true,
        default  : "CUSTOMER",
        enum: [ "CUSTOMER","ENGINEER"]
    },
    userStatus:{
        type: String, 
        required: true, 
        default: "APPROVED",
        enum : ["APPROVED", " PENDING" , "REJECTED"]
    },
    createdAt : {
        type : Date,
        default : () => {
            return Date.now();
        },
        immutable : true
    },
    updatedAt : {
       type : Date,
       default : () => {
          return Date.now();
       } 
    }
});

module.exports = mongoose.model("User",user_schema);