/**Here we are going to check the validation of the Ticket */

const Ticket = require("../models/ticket.model");
const User = require("../models/user.model");

const validateTicketReqBody = (req,res,next) => {

    if(!req.body.title){
        return res.status(400).send({
            message : "Title of the ticket is missing"
        });
    }

    if(!req.body.description){
        return res.status(400).send({
            message : "Description of the ticket is missing"
        });
    }

    if(req.body.status != undefined){
        if(!(["OPEN","IN_PROGRESS","CLOSED"].includes(req.body.status))){
            return res.status(400).send({
                message : "Status of the ticket is missing"
            });
        }
    }
    next();

}


const isEligibleToUpdate = async (req, res, next) => {


    //First we have to check the userType
    const callingUser = await User.findOne({userId : req.userId});
    const ticket = await Ticket.findOne({_id : req.params.id});
    
    if(!ticket){
        return res.status(400).send({
            message : "Ticket not found"
        });
    }
    
    //Then we have to query as per the UserType
    if(callingUser.userType == "CUSTOMER"){
        if(ticket.reporter != callingUser.userId){
            return res.status(403).send({
                message : " User is not authorized to update"
            })
        }

    }else if(callingUser.userType == "ENGINEER"){
        if(ticket.reporter != callingUser.userId && ticket.assignee != callingUser.userId){
            return res.status(403).send({
                message : " User is not authorized to update"
            })
        }
    }


    //And finally returning it
    next();

}

module.exports = {
    validateTicketReqBody: validateTicketReqBody
}