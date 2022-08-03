/**This should be the starting point of the application  */

const express = require('express');
const app = express();

const server_config  = require('./configs/server.config');
const db_config  = require('./configs/db.config');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require("./models/user.model");

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/**Database connection */

mongoose.connect(db_config.DB_URL);

const db = mongoose.connection;

db.on('error' , () =>{
    console.log('Error connecting to database: ');
});

db.once("open" , () =>{
    console.log('Connected to database...');

    /**Writeing the logic to clean and initialize the database*/
    //init();
});

async function init(){
    /**Delete the users collections if its already present */
    await User.collection.drop();

    /**We should on ADMIN user from the database */

    const user = await User.create({
        name :  "Admin",
        userId : "admin101",
        password : bcrypt.hashSync("Welcome1",8),
        email : "admin@admin101.com",
        userType : "ADMIN"
    });
    console.log(user);
}


/**Plugging the routes */
require("./routes/auth.route")(app);
require("./routes/user.route")(app);


/**starting point*/
app.listen(server_config.PORT, () => {
    console.log(`Server listening on port ${server_config.PORT}`);
})
