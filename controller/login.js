var express = require('express');
var routes = express.Router();
var sha1 = require('sha1');
var user = require("../model/user");

routes.get("/", function(req, res){
	var pageData = { title : "Login Page", pagename : "login/index", msg : req.flash('msg')};
	res.render("layout", pageData);
});


routes.post("/", function(req, res){
	// console.log(req.body);
	var u = req.body.username;
	var p = sha1(req.body.password);

	user.findWhere({ username : u}, function(err, result){
		if(result.length==1)
		{
			var data = JSON.parse(JSON.stringify(result[0]));
			if(data.password == p)
			{
				req.session.name = data.full_name;
				req.session.uid = data.id;
				req.session.is_user_logged_in = true;
				res.redirect("/user");
			}
			else
			{
				req.flash("msg", "This password is incorrect");
				res.redirect("/login");	
			}
		}
		else
		{
			req.flash("msg", "This username and password is incorrect");
			res.redirect("/login");
		}
	});
});


module.exports=routes;