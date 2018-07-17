var con = require("../config/connect");
var sha1 = require('sha1');

module.exports.insert=function(obj, cb){
	con.connect(function(err){
		var que = "INSERT INTO user (full_name, username, password, address, gender, city) VALUES ('"+obj.full_name+"', '"+obj.username+"', '"+sha1(obj.password)+"', '"+obj.address+"', '"+obj.gender+"', '"+obj.city+"')";
		con.query(que, cb);
	});
}

module.exports.findWhere=function(obj, cb){
	con.connect(function(err){
		var que = "SELECT * FROM user WHERE ";
		var counter=1;
		for(var k in obj){
			if(counter==1)
			{
				que += k+"= '"+obj[k]+"'";
			}
			else
			{
				que += " AND "+k+"= '"+obj[k]+"' ";

			}
			counter++;
		}


		// console.log(que);
		con.query(que, cb);
	});
}