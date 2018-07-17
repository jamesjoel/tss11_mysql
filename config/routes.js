var express = require('express');
var routes = express.Router();


routes.use("/", require("../controller/home"));
routes.use("/login", require("../controller/login"));
routes.use("/signup", require("../controller/signup"));



module.exports=routes;