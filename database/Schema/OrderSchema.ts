import mongoose = require('mongoose');
import q = require("q");

import {FindEmployeeData} from './EmployeeSchema'

interface IOrderSchema extends mongoose.Document {
    Name: String,
    Quantity: String,
    CompanyId: String,
    EmployeeId: String,
    Longitude :  String,
    Latitude : String ,
    LocationName : String   
}
//create Schema

let OrderSchema = new mongoose.Schema({
    Name: String,
    Quantity: String,
    CompanyId: String,
    EmployeeId: String,
    Longitude :  String,
    Latitude : String ,
    LocationName : String   
});
                 
//compile Schema
let OrderModel = mongoose.model<IOrderSchema>("Order", OrderSchema);

//function saving object 
export function SaveOrderObject(OrderObj) {
    console.log(OrderObj);
    let Order = new OrderModel(OrderObj);
    Order.save((err, success) => {
        if (!err) {
            console.log('from saving Order Object', success);
        }
        else {
            console.log('from err Order Object', err);
        }
    });
}

export function FindOrderData(OrderObject) {    
        let deferred = q.defer();        
    OrderModel.find( OrderObject , (err, res) => {
          if(res){             
             deferred.resolve(res);
           }   
           else{
               deferred.reject("Error occurred while saving user");   
           }
      })   
      
      return deferred.promise ;        
}

export function FindCurrentEmployee(OrderObject) {

    return FindEmployeeData(OrderObject);

}
    