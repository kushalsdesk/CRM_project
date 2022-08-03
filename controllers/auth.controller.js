/**This file will have the logic for signup and singin users */


/**creating a function  to allow the user to sign
 * JSON request body to be available  as JS object
 * 
*/

const bcrypt  = require('bcryptjs');

const User = require("../models/user.model");
const jwt = require('jsonWebToken');

const authConfig = require("../configs/auth.config")

exports.signup = async(req, res) => {
    /**logic for signup */


    /** firstly , read the request body
     * and create the JS object to be inserted in the DB
    */

    try{
        const userObj = {
           name : req.body.name,
           userId : req.body.userId,
           email : req.body.email,
           userType : req.body.userType,
           password : bcrypt.hashSync(req.body.password,8)
        }

        /**I need to set the user status */

       if(!userObj.userType || userObj.userType == "CUSTOMER"){
            userObj.userStatus = "APPROVED";
        }else{
            userObj.userStatus = "PENDING";
        }

        /**Insert the data in the database */
        const savedUser = await User.create(userObj);
        const postResponse = {
            name : savedUser.name,
            userId : savedUser.userId,
            email : savedUser.email,
            userType : savedUser.userType,
            userStatus : savedUser.userStatus,
            createdAt : savedUser.createdAt,
            updatedAt : savedUser.updatedAt
        }


        /**Return the success response to the customer*/

        res.status(201).send(postResponse);
    }   
    catch(err){
        console.log("Error while registering user" , err.message);
        res.status(500).send({
                message: "Some Internal Error occurred"
        });
  
    }
}


/**Controller code for the login */

exports.signin = async(req,res) => {
    //Read the userId and password from the request
    try{
        const userIdFromReq = req.body.userId;
        const password = req.body.password;
    
        //Ensure the userId is valid
        const userSaved = await User.findOne({userId: userIdFromReq});
        if(!userSaved){
            return  res.status(401).send({
                message: "User id passed is not correct"
            });
        }
        //Ensure that the password is valid
        const isValidPassword = bcrypt.compareSync(password, userSaved.password);    
        if(!isValidPassword){
            return res.status(401).send({
                message: "Invalid Password"
            });
        }

        //check if the user is in the "Approved" state    

        if(userSaved.userStatus != "APPROVED"){
            return res.status(403).send({
                message: "User is not Approved for login"        
            })
        }
        //We need t generate the access token(JWT token)
        const token = jwt.sign({
            id : userSaved.userId
        },authConfig.secret,{
            expiresIn : 600
        })
        
        
        //send the response
    
        res.status(200).send({
            name : userSaved.name,
            userId : userSaved.userId,
            email : userSaved.email,
            userType : userSaved.userType,
            userStatus : userSaved.userStatus,
            accessToken : token
        });
    
    }catch(err){
        console.log("Error while login",err.message);
        res.status(500).send({
            message: "Internal Server Error",
        })
    }
    
}