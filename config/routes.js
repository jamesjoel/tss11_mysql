var express = require('express');
var routes = express.Router();


routes.use("/", require("../controller/home"));
routes.use("/login", require("../controller/login"));
routes.use("/signup", require("../controller/signup"));
routes.use("/user", userBackDoor, require("../controller/user"));


function userBackDoor(req, res, next)
{
	if(! req.session.is_user_logged_in){
		res.redirect("/login");
		return;
	}
	next();
}



module.exports=routes;