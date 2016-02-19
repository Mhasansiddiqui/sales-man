/// <reference path="./typings/node/node.d.ts" />  
var express = require("express");
//Custom files start //
var connection_1 = require('./database/connection');
connection_1.connectionToDb();
var admin_1 = require('./serverRoutes/admin');
var salesman_1 = require('./serverRoutes/salesman');
var general_1 = require('./serverRoutes/general');
var superuser_1 = require('./serverRoutes/superuser');
//Custom files end //  
//connecting to Database
var app = express();
app.set("port", process.env.PORT || 3000);
app.use('/admin', admin_1.admin);
app.use('/salesman', salesman_1.salesman);
app.use('/superuser', superuser_1.superuser);
app.use('/', general_1.general);
app.use(function (err, req, res, next) {
    res.status(500);
    next(err);
});
app.use(function (err, req, res, next) {
    console.log('GOT ERROR' + err);
});
app.listen(app.get("port"), function () {
    console.log('running server on 3000');
});
