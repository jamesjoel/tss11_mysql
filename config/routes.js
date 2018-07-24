var express = require('express');
var routes = express.Router();
var passport = require("./passport");

routes.use("/", require("../controller/home"));
routes.use("/login", require("../controller/login"));
routes.use("/signup", require("../controller/signup"));
routes.use("/user", userBackDoor, require("../controller/user"));



routes.get('/auth/facebook',
  passport.authenticate('facebook'));

routes.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });



function userBackDoor(req, res, next)
{
	if(! req.session.is_user_logged_in){
		res.redirect("/login");
		return;
	}
	next();
}



module.exports=routes;