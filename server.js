/**This should be the starting point of the application  */

const express = require('express');
const app = express();

const server_config  = require('./configs/server.config');
const db_config  = require('./configs/db.config');
const mongoose = require('mongoose');

/**Database connection */

mongoose.connect(db_config.DB_URL);

const db = mongoose.connection;

db.on('error' , () =>{
    console.log('Error connecting to database: ');
});

db.once("open" , () =>{
    console.log('Connected to database...');
});

/**starting point*/
app.listen(server_config.PORT, () => {
    console.log(`Server listening on port ${server_config.PORT}`);
})