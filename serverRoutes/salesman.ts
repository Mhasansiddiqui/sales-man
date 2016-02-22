import express = require('express');
import filepath =  require('path');

import bodyparser = require('body-parser');



import {SaveOrderObject , FindCurrentEmployee}  from './../database/Schema/OrderSchema' ;
import {FindCompanyData}  from './../database/Schema/CompanySchema' ;


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

salesman.get('/' , function(req,res){     
   res.send(0);
})


salesman.post('/login', (req : express.Request , res : express.Response)=>{
    
     FindCurrentEmployee(req.body).then((instance)=>{
            var cId =  instance[0].companyId ;
            var object = { _id : cId };
             FindCompanyData(object).then((data) =>{
             instance[0].companyName = data[0].companyName ;  
             res.send({status : true, user : instance});             
             },(err)=>{
                 
             })
         
     },(err)=>{
       	res.send({status : true, user : err});
         }
      )
});
