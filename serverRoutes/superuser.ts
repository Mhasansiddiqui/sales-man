
import express = require('express');
import filepath = require('path');
import bodyparser = require('body-parser');


import {SaveUserObject }  from './../database/Schema/UserSchema' ;
let staticDIR = filepath.resolve(__dirname , "./../client/superuser");


var Firebase = require('firebase');
var url = require('url');


export var superuser = express.Router();


superuser.post('/login', (req : express.Request , res : express.Response)=>{
  
  
});



superuser.use(bodyparser.json());
superuser.use( bodyparser.urlencoded({extended  : false }) );




superuser.post('/CreateUser', (req : express.Request , res : express.Response)=>{      
       var scope = this;      
       
       
       
       var ref = new Firebase("https://sales-man.firebaseio.com/");
            ref.createUser({
            email    :req.body.email ,
            password : req.body.password
            }, function(error, userData) {
       if (error) {
      console.log("Error creating user:", error);
       } else {
              console.log("Successfully created user account with uid:", userData);    
               var object = req.body ;
                object.sid = userData.uid;              
                SaveUserObject(object);   
                res.send(req.body);
            }
          });            
});

superuser.use(express.static(staticDIR));