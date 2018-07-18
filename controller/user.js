var express = require('express');
var routes = express.Router();
var user = require("../model/user");
var path = require("path");
var crypto = require('crypto');

function change_name(name)
{
	var arr = name.split(".");
	var ext = arr[arr.length-1];
	var new_name = crypto.randomBytes(15).toString('hex')+"."+ext;
	return new_name;
}



routes.get("/", function(req, res){
	var pageData = { title : "Signup Page", pagename : "user/index"};
	res.render("layout", pageData);
});


routes.get("/profile", function(req, res){
	var findObj = { id : req.session.uid };
	user.findWhere(findObj, function(err, result){
		result = JSON.parse(JSON.stringify(result[0]));
		var pageData = { title : "Profile Page", pagename : "user/profile", userdata : result};
		res.render("layout", pageData);
	});
});

routes.get("/update", function(req, res){
	var findObj = { id : req.session.uid };
	user.findWhere(findObj, function(err, result){
		result = JSON.parse(JSON.stringify(result[0]));
		var pageData = { title : "Profile Update Page", pagename : "user/update", userdata : result};
		res.render("layout", pageData);
	});
});


routes.get("/upload", function(req, res){
	var findObj = { id : req.session.uid };
	user.findWhere(findObj, function(err, result){
		result = JSON.parse(JSON.stringify(result[0]));
		var pageData = { title : "Profile Update Page", pagename : "user/upload", userdata : result};
		res.render("layout", pageData);
	});
});

routes.post("/upload", function(req, res){
	// console.log(req.files);
	var img = req.files.image;
	var new_name = change_name(img.name);
	var newpath = path.resolve("public/user_img/"+new_name);
	console.log(newpath);
	img.mv(newpath, function(err){
		user.updateImg({id : req.session.uid}, { img : new_name }, function(err, result){

			res.redirect("/user/profile");
		});
	});
});




routes.post("/update", function(req, res){
	user.update({id : req.session.uid}, req.body, function(err, result){
		res.redirect("/user/profile");
	});
});


routes.get("/logout", function(req, res){
	req.session.destroy();
	res.redirect("/");
});



module.exports=routes;