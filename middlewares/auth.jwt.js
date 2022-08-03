/**
 * We should have a method to validate the access token
 */

const jwt = require("jsonwebtoken");
const config = require("../configs/auth.config")
const User = require("../models/user.model");   
//Defining the middleware for the token validation
const verifyToken = (req,res,next) => {

    /**if the token is present*/
    const token = req.headers['x-access-token'];
    if(!token){
        res.status(403).send({
            message : "No token provided"
        });
    }
    /**if the token is valid */

    
        jwt.verify(token,config.secret,(err,decoded) => {
            if(err){
                return res.status(410).send({
                    message : "Invalid Token",
                });
            }
            console.log("Token is valid")

            //Fetch the userId ffrom token and set it to the request object

            req.userId = decoded.id;
            next();
        }) 
    
}



/**Middleware to go and check if the user is Admin */


const isAdmin = async (req,res,next) => {
    
    const user =  await User.findOne({userId : req.userId});

    if(user && user.userType == 'ADMIN'){
        next();
    }else{
        return res.status(403).send({
            message : "Only the Admin is allowed to access"
        });
    }


}

/**Middleware to check if the user is admin or owner 
 * 
 * 
*/


const isAdmin_or_owner = async (req,res,next) => {
    const callingUser = await User.findOne({userId : req.userId});

    if(callingUser.userType == 'ADMIN' || callingUser.userId == req.params.userId){
        
        if(req.body.userStatus && callingUser.userType != "ADMIN"){
            return res.status(403).send({
                message : "Only the Admin is allowed to access"
            });
        }
        
        next();    
    }else{
        return res.status(403).send({
            message : "Only the Admin or Owner is allowed to access"
        });

    }
}   

module.exports = {
    verifyToken : verifyToken,
    isAdmin : isAdmin,
    isAdmin_or_owner : isAdmin_or_owner

}