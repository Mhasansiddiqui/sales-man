import express = require('express');
import filepath =  require('path');

import bodyparser = require('body-parser');
import {SaveOrderObject , FindCurrentEmployee}  from './../database/Schema/OrderSchema' ;


// import {connectionToDb}  from './../database/Connection' ;
// connectionToDb(); 

var a = filepath.resolve(__dirname,'./../public/salesMan/www') ;

export var salesman = express.Router();

salesman.use(bodyparser.json());
salesman.use( bodyparser.urlencoded({extended  : false }) );

salesman.use(express.static(a));
   
salesman.post('/CreateOrder' , function(req,res){  
   SaveOrderObject(req.body);
   console.log(req.body);
})

salesman.post('/' , function(req,res){     
   res.send(0);
})


salesman.post('/login', (req : express.Request , res : express.Response)=>{
    console.log(req.body);
    
     FindCurrentEmployee(req.body).then((instance)=>{
        	res.send({status : true, user : instance});
     },(err)=>{
       	res.send({status : true, user : err});
         }
      )
});
