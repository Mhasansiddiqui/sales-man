  /// <reference path="./typings/node/node.d.ts" />  
import express = require("express");
//Custom files start //
import {connectionToDb}  from './database/connection' ;
 connectionToDb();
 
  
import {admin} from './serverRoutes/admin';
import {salesman} from './serverRoutes/salesman';
import {general} from './serverRoutes/general';
import {superuser} from './serverRoutes/superuser';


//Custom files end //  
//connecting to Database
let  app = express();
app.set("port", process.env.PORT || 3000);
app.use('/admin' , admin );
app.use('/salesman' , salesman);
app.use('/superuser' , superuser);
app.use('/' , general);


app.use((err : any , req : express.Request , res  : express.Response , next  : Function )=>{
     res.status(500)
     next(err);   
});
app.use((err : any , req : express.Request , res  : express.Response , next  : Function )=>{
   console.log('GOT ERROR' + err);
});
app.listen(app.get("port"), ()=>{
    console.log('running server on 3000');
});
