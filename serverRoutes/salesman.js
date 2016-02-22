var express = require('express');
var filepath = require('path');
var bodyparser = require('body-parser');
var OrderSchema_1 = require('./../database/Schema/OrderSchema');
var CompanySchema_1 = require('./../database/Schema/CompanySchema');
// import {connectionToDb}  from './../database/Connection' ;
// connectionToDb(); 
var a = filepath.resolve(__dirname, './../public/salesMan/www');
exports.salesman = express.Router();
exports.salesman.use(bodyparser.json());
exports.salesman.use(bodyparser.urlencoded({ extended: false }));
exports.salesman.use(express.static(a));
exports.salesman.post('/CreateOrder', function (req, res) {
    OrderSchema_1.SaveOrderObject(req.body);
    console.log(req.body);
});
exports.salesman.get('/', function (req, res) {
    res.send(0);
});
exports.salesman.post('/login', function (req, res) {
    OrderSchema_1.FindCurrentEmployee(req.body).then(function (instance) {
        var cId = instance[0].companyId;
        var object = { _id: cId };
        CompanySchema_1.FindCompanyData(object).then(function (data) {
            instance[0].companyName = data[0].companyName;
            res.send({ status: true, user: instance });
        }, function (err) {
        });
    }, function (err) {
        res.send({ status: true, user: err });
    });
});
