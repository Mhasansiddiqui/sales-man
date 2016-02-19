import mongoose = require('mongoose');
import q 		= require("q");


// import {connectionToDb}  from './../Connection' ;
// connectionToDb(); 

interface ICompanySchema extends mongoose.Document {    
    companyName :  String ,  
    createdBy : String ,     
    createdOn : {type : Date    },
     
}
//create Schema
let companySchema = new mongoose.Schema ({    
    companyName :  String ,    
    createdBy : String ,     
    createdOn : {type : Date , default: Date.now },   
    userId : String 
})
//compile Schema
let CompanyModel = mongoose.model<ICompanySchema>("Company", companySchema);

//function saving object
 
  export function SaveComapnyObject(UserObj){      
     let company = new  CompanyModel(UserObj);          
     company.save((err,success)=>{ 
         if(!err){
             console.log('from saving Company Object',success);
         }
     });
  }

//function finding Data by Company Name 

  export function FindCompanyData(UserObject){
       let deferred = q.defer();
      CompanyModel.find(UserObject , (err , res)=>{
         if(res){
             
			deferred.resolve(res);
          }
          else{
           deferred.reject("Error occurred while saving user");   
          }         
      }) 
   return deferred.promise; 
                
  }
    