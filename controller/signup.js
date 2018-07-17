var express = require('express');
var routes = express.Router();
var user = require("../model/user");


routes.get("/", function(req, res){
	var pageData = { title : "Signup Page", pagename : "signup/index"};
	res.render("layout", pageData);
});

routes.post("/", function(req, res){
	console.log(req.body);
	user.insert(req.body, function(err, result){
		console.log(result);
		res.redirect("/login");
	});

});


module.exports=routes;