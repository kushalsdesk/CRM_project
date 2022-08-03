/**Here will the set the path for the ticket creation */


const auth = require("../middlewares/auth.jwt");

const tickerValidator = require("../middlewares/ticket.middleware");

const tickerController = require("../controllers/ticket.controller");

module.exports = (app) => {

    /**Creting a ticket */


    /**POST /crm/api/v1/tickets */



    app.post("/crm/api/v1/tickets",[auth.verifyToken,tickerValidator.validateTicketReqBody],tickerController.createTicket);
}