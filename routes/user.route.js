/**This will be the route files for the user resource */


const userController = require("../controllers/user.controller");
const auth = require("../middlewares/auth.jwt");
module.exports = (app) => {

    // GET /crm/api/v1/users -> user controller, findAll method will be called

    //We are going to patch chained middleware between 
    //route and controller

    
    app.get("/crm/api/v1/users",[auth.verifyToken,auth.isAdmin],userController.findAll);

    /***
     * Endpoint for updating user
     * PUT /crm/api/v1/users/ADMIN -> user controller - update method
     * */

    app.put("/crm/api/v1/users/:id" ,[auth.verifyToken,auth.isAdmin_or_owner],userController.update); 

}