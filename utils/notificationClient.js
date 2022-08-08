/**This will have the logic to send the Email programetically */

const Client = require("node-rest-client").Client;

const client = new Client();


module.exports = (subject,content,recepient,requester) => {  

    /**Send a post request to the   notification controller*/

    /**Request Body */

    const reqBody = {
        subject:subject,
        recepientEmail : recepient,
        content : content,
        requester : requester
    }

    /*Request Headers */
    const reqHeaders = {
        "Content-Type" : "application/json",
        "Accept" : "application/json",
        "X-Requested-With" : "XMLHttpRequest"
    }

    const args = {
        data : reqBody,
        headers : reqHeaders,
    }
    /**Do the post call */
    client.post("http://localhost:8000/notiserv/api/v1/notifications",args,(data,res) => {
        console.log("Request sent");
        console.log(data);
    })


}  