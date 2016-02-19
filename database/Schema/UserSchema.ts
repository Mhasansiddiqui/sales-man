import mongoose = require('mongoose');
import q 		= require("q");

var FirebaseTokenGenerator = require("firebase-token-generator");


interface IUserSchema extends mongoose.Document {
    email : String,
    userName :  String ,
    password :  String ,
    createdBy : String ,     
    createdOn : {type : Date   }  ,
    sid : String   
}
//create Schema

let UserSchema = new mongoose.Schema ({
    email : String,
    userName :  String ,
    password :  String ,
    createdBy : String ,     
    createdOn : {type : Date , default: Date.now },    
    sid : String
})
//compile Schema
let UserModel = mongoose.model<IUserSchema>("User",UserSchema);



//function saving object
 
  export function SaveUserObject(UserObj){      
     let user = new  UserModel(UserObj);          
     user.save((err,success)=>{ 
         if(!err){
             console.log('from saving User Object',success);
         }
         else{
             console.log('from err User Object',err);
         }
     });
  }

//function finding Data by Email 

  export function FindUserData(UserObject){
      UserModel.find(UserObject , (err , res : IUserSchema[])=>{
         res.forEach(function(UserObject){
                      
         });    
      })           
  }
  
   export function FindOneUserData(UserObject){
       let deferred = q.defer();    
      UserModel.findOne(UserObject ,  (err , res  )=>{    
          if(res){
              
             var tokenGenerator = new FirebaseTokenGenerator("fmg2oEE1C1f7n4875ri5IucpBlnlt5oC3f3OyuPH");
            var token = tokenGenerator.createToken({ uid: res.sid });
            var result = { usertoken: token, user: res }
			deferred.resolve(result);
          }
          else{
           deferred.reject("Error occurred while saving user");   
          }         
      }) 
   return deferred.promise; 
         
  }
    