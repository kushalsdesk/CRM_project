/**Here we are going to check the validation of the Ticket */

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

module.exports = {
    validateTicketReqBody: validateTicketReqBody
}