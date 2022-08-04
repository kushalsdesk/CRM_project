/**
 * Controller method dfor creatiing tickets 
 * 
 *  1.USer is Authenticated ---- Taken care by the auth middleware
 *  2. Req body is validated ---- middleware
 *  3.Insert the Ticket body
 * 
 * */


const User = require("../models/user.model");
const Ticket = require("../models/ticket.model");

exports.createTicket = async (req,res) =>{
    
    //Create the Ticket Object from the request Body
    
    try{
        const reqObj = {

            title : req.body.title,
            ticketPriority : req.body.ticketPriority,
            description  : req.body.description,
            status : req.body.status,
            reporter : req.userId   //this will be retrieved from the access token
    
        }
    
    
        /**
         * I need to assign one enginner to the ticket
         */
    
        const engineer = await User.findOne({
            userType :  "ENGINEER",
            userStatus : "APPROVED"
        });
        
        if(engineer){
            reqObj.assignee = engineer.userId;
        }
        
        const ticketCreated = await Ticket.create(reqObj);
    
    
        if(ticketCreated){
    
            /**Need to update the customer */
            const customer = await User.findOne({userId: req.userId});
            customer.ticketsCreated.push(ticketCreated._id);
            await customer.save()
    
    
            /**Need the Engineer document if assigned */
    
            if(engineer){
                engineer.ticketAssigned.push(ticketCreated._id);
                await engineer.save()
            }
            /** Finally the request is sent*/
    
    
            res.status(201).send(ticketCreated)
        }
    }catch(err){
        console.log("Error while creating ticket", err.message)
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
    
}


/**Method to fetch all the tickets */


exports.getTickets = async (req,res) => {

    try{

        /**Need to first see what type of user it is */
        
        const userId = req.userId;
        const callingUser =  await User.findOne({userId: userId});
        const queryObj = {};
        /**Then we can have the query as per user */

        if(callingUser.userType == "CUSTOMER"){
            queryObj.reporter = req.userId;
            //to check if the values are correct
            console.log(req.userId);
            console.log(queryObj);
        }else if(callingUser.userType == "ENGINEER"){
            queryObj.$or = [{reporter : req.userId},{assignee : req.userId}];
            console.log(queryObj);
        }

        /**Finally return the result */

        const tickets = await Ticket.find({queryObj});
        return res.status(200).send(tickets);

    }
    catch(err){
        console.log("There is an error while fetchin all the tickets", err.message);
        res.status(500).send({
            message : " Internal server Error"
        });
    }

}