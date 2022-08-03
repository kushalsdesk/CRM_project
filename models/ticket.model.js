/**Here we are having the  Ticket model */

const mongoose = require('mongoose');

const ticket_schema = new mongoose.Schema({

    title:{
        type : String,
        required : true
    },
    ticketPriority:{
        type : Number,
        required : true,
        default : 4
    },
    description:{
        type : String,
        required : true
    },
    status:{
        type : String,
        required : true,
        deafult : "OPEN",
        enum : ["OPEN","IN_PROGRESS","CLOSED"]
    },
    reporter : {
        type : String,
        required : true
    },
    assignee :{
        type : String,
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


module.exports = mongoose.model("Ticket", ticket_schema);