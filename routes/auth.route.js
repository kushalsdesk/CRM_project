/**This will have the logic to route the request to differnet controllers */

const authController = require("../controllers/auth.controller");

module.exports = (app) => {
    
    /**This the route for the sign up  */
    //POST /crm/api/v1/auth/signup = -> auth controller sign up method
    
    app.post("/crm/api/v1/auth/signup", authController.signup );
    
    
    /**This the route for the sign in  */
    //POST /crm/api/v1/auth/signin = -> auth controller sign in method

    app.post("/crm/api/v1/auth/signin", authController.signin)


}




