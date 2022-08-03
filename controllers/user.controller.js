/**This logic will fetch all the users
 *  1. he is a valid users
 *  2. he should be the admin
 * 
 *  Above validation should be done as the part of the middleware
 * 
 */


const User = require("../models/user.model");
const objectConverter = require("../utils/objectConverter");

exports.findAll = async(req,res)  => {

   try{
        /**lets try to read the query param if any */

        const queryObj = {};

        const userTypeQ = req.query.userType;

        if(userTypeQ){
          queryObj.userType = userTypeQ;
        }

        const userStatusQ = req.query.userStatus;

        if(userStatusQ) {
          queryObj.userStatus = userStatusQ;
        }

        const users = await User.find(queryObj);

        res.status(200).send(objectConverter.userResponse(users));
     }
   catch(err){
        console.log("There is some issue with responding the userlist",err.message);
        res.status(500).send({
            message : "Internal server error while responding user"
        })
     }
}


/**
 * 
 * Controller method to update the user record 
 *  1.Only ADMIN and the owner should be allowed to update the user record
 * 
 * */



exports.update = async (req,res) => {
  try{
    
     //**Fetch the user object if its present */
     const user = await User.findOne({userId : req.params.id});
     if(!user){
      return res.status(404).send({
        message : "User not found"
      });
     }

     /**Update the user object based on the request */
      user.name = req.body.name != undefined ? req.body.name : user.name;

      user.userStatus = req.body.userStatus != undefined ? req.body.userStatus : user.userStatus;

      user.userType = req.body.userType != undefined ? req.body.userType : user.userType;

     /**Save the user object and return the updated user object */

    const updatedUser = await user.save();

    res.status(200).send({
      name : updatedUser.name,
      userId : updatedUser.userId,
      userStatus : updatedUser.userStatus,
      email : updatedUser.email,
      userType : updatedUser.userType
    })


  }catch(err){
    console.log("There is some issue with updating the updating ",err.message);

    res.status(500).send({
      message : "Internal server Error"
    })
  }
}
