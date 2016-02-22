import mongoose = require('mongoose');
import q 		= require("q");



interface IEmployeeSchema extends mongoose.Document {
    email : String,
    userName :  String ,
    password :  String ,
    createdBy : String ,     
    createdOn : {type : Date  }  ,     
    employeeId : String      ,
    companyId  : String ,
    photo : {type : Buffer }
}
//create Schema
let EmployeeSchema = new mongoose.Schema ({
    email : String,
    userName :  String ,
    password :  String ,
    createdBy : String ,     
    companyId  : String ,
    companyName  : String ,
    phone : String,
    createdOn : {type : Date }   ,    
    employeeId : String
    
})
//compile Schema
let EmployeeModel = mongoose.model<IEmployeeSchema>("Employee",EmployeeSchema);

//function saving object
 
  export function SaveEmployeeObject(EmployeeObj){      
     let user = new  EmployeeModel(EmployeeObj);          
     user.save((err,success)=>{ 
         if(!err){
             console.log('from saving Employee Object',success);
         }
     });
  }

//function finding Data by Email 

  export function FindEmployeeData(EmployeeObject){
        let deferred = q.defer();  
      EmployeeModel.find(EmployeeObject , (err , res )=>{
           if(res){             
             deferred.resolve(res);
           }   
           else{
               deferred.reject("Error occurred while saving user");   
           }
      })   
      
      return deferred.promise ;        
  }
    