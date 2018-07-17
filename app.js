var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('express-flash');
var upload = require('express-fileupload');
var cache = require('nocache');


app.set('view engine', 'ejs');



app.use(bodyParser());
app.use(cookieParser());
app.use(session({ secret : "TSS"}));
app.use(flash());
app.use(cache());
app.use(upload());

app.use(express.static(__dirname+"/public"));

app.use(require('./config/routes'));

app.listen(process.env.PORT || 3000, function(){
	console.log("Server Running");
});