/// <reference path="../typings/node/node.d.ts" />

import express = require('express');
import filepath = require('path');
import bodyparser = require('body-parser');
var Firebase = require('firebase');

// import {connectionToDb}  from './../database/Connection' ;
// connectionToDb(); 


var FirebaseTokenGenerator = require("firebase-token-generator");

var url = require('url');

//custom files //
import {FindUserData,SaveUserObject , FindOneUserData}  from './../database/Schema/UserSchema' ;
import {FindOrderData} from './../database/Schema/OrderSchema' ;
import  {FindCompanyData,SaveComapnyObject}  from './../database/Schema/CompanySchema' ;
import {FindEmployeeData,SaveEmployeeObject} from './../database/Schema/EmployeeSchema'
//

export var admin = express.Router();

let staticDIR = filepath.resolve(__dirname , "./../../client/adminPortal");

admin.use(bodyparser.json());
admin.use( bodyparser.urlencoded({extended  : false }) );



admin.post('/ViewOrder' , (req , res)=>{        
        FindOrderData(req.body).then((userInstance)=>{
						res.send({status : true, user : userInstance});
					}, (err)=>{
						res.send({status: false, message : err});
					});      
})


admin.get('/detail/', function(req, res) {
    var object = { userId : req.query.id}
    FindCompanyData(object).then((userInstance)=>{
						res.send({status : true, user : userInstance});
					}, (err)=>{
						res.send({status: false, message : err});
					});   
});

admin.get('/CreateEmployee/', function(req, res) {
      var object = { companyId : req.query.id  }     
     FindEmployeeData(object).then((userInstance)=>{
						res.send({status : true, user : userInstance});
					}, (err)=>{
						res.send({status: false, message : err});
					});
});

admin.post('/CreateCompany', (req : express.Request , res : express.Response)=>{
     
          res.send(req.body);
          SaveComapnyObject(req.body)
});



admin.post('/CreateEmployee', (req : express.Request , res : express.Response )=>{
         SaveEmployeeObject(req.body);
         res.send(req.body);  
        
});

admin.post('/login', (req : express.Request , res : express.Response)=>{
   // console.log(FindOneUserData(req.body));
    FindOneUserData(req.body).then((userInstance)=>{       
						res.send({status : true, user : userInstance});
					}, (err)=>{
						res.send({status: false, message : err});
					});
});

admin.use(express.static(staticDIR));