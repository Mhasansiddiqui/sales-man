var _this = this;
var express = require('express');
var filepath = require('path');
var bodyparser = require('body-parser');
var UserSchema_1 = require('./../database/Schema/UserSchema');
var staticDIR = filepath.resolve(__dirname, "./../client/superuser");
var Firebase = require('firebase');
var url = require('url');
exports.superuser = express.Router();
exports.superuser.post('/login', function (req, res) {
});
exports.superuser.use(bodyparser.json());
exports.superuser.use(bodyparser.urlencoded({ extended: false }));
exports.superuser.post('/CreateUser', function (req, res) {
    var scope = _this;
    var ref = new Firebase("https://sales-man.firebaseio.com/");
    ref.createUser({
        email: req.body.email,
        password: req.body.password
    }, function (error, userData) {
        if (error) {
            console.log("Error creating user:", error);
        }
        else {
            console.log("Successfully created user account with uid:", userData);
            var object = req.body;
            object.sid = userData.uid;
            UserSchema_1.SaveUserObject(object);
            res.send(req.body);
        }
    });
});
exports.superuser.use(express.static(staticDIR));
