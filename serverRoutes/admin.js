/// <reference path="../typings/node/node.d.ts" />
var express = require('express');
var filepath = require('path');
var bodyparser = require('body-parser');
var Firebase = require('firebase');
// import {connectionToDb}  from './../database/Connection' ;
// connectionToDb(); 
var FirebaseTokenGenerator = require("firebase-token-generator");
var url = require('url');
//custom files //
var UserSchema_1 = require('./../database/Schema/UserSchema');
var OrderSchema_1 = require('./../database/Schema/OrderSchema');
var CompanySchema_1 = require('./../database/Schema/CompanySchema');
var EmployeeSchema_1 = require('./../database/Schema/EmployeeSchema');
//
exports.admin = express.Router();
var staticDIR = filepath.resolve(__dirname, "./../../client/adminPortal");
exports.admin.use(bodyparser.json());
exports.admin.use(bodyparser.urlencoded({ extended: false }));
exports.admin.post('/ViewOrder', function (req, res) {
    OrderSchema_1.FindOrderData(req.body).then(function (userInstance) {
        res.send({ status: true, user: userInstance });
    }, function (err) {
        res.send({ status: false, message: err });
    });
});
exports.admin.get('/detail/', function (req, res) {
    var object = { userId: req.query.id };
    CompanySchema_1.FindCompanyData(object).then(function (userInstance) {
        res.send({ status: true, user: userInstance });
    }, function (err) {
        res.send({ status: false, message: err });
    });
});
exports.admin.get('/CreateEmployee/', function (req, res) {
    var object = { companyId: req.query.id };
    EmployeeSchema_1.FindEmployeeData(object).then(function (userInstance) {
        res.send({ status: true, user: userInstance });
    }, function (err) {
        res.send({ status: false, message: err });
    });
});
exports.admin.post('/CreateCompany', function (req, res) {
    res.send(req.body);
    CompanySchema_1.SaveComapnyObject(req.body);
});
exports.admin.post('/CreateEmployee', function (req, res) {
    EmployeeSchema_1.SaveEmployeeObject(req.body);
    res.send(req.body);
});
exports.admin.post('/login', function (req, res) {
    // console.log(FindOneUserData(req.body));
    UserSchema_1.FindOneUserData(req.body).then(function (userInstance) {
        res.send({ status: true, user: userInstance });
    }, function (err) {
        res.send({ status: false, message: err });
    });
});
exports.admin.use(express.static(staticDIR));
