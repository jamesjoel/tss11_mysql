var mysql = require('mysql');
module.exports=mysql.createConnection({
		host : "localhost",
		user : "admin",
		password : "admin",
		database : "tss11"
	});
	

