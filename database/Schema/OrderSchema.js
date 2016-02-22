var mongoose = require('mongoose');
var q = require("q");
var EmployeeSchema_1 = require('./EmployeeSchema');
//create Schema
var OrderSchema = new mongoose.Schema({
    Name: String,
    Quantity: String,
    CompanyId: String,
    EmployeeId: String,
    Longitude: String,
    Latitude: String,
    LocationName: String,
    phone: String,
    CompanyName: String
});
//compile Schema
var OrderModel = mongoose.model("Order", OrderSchema);
//function saving object 
function SaveOrderObject(OrderObj) {
    console.log(OrderObj);
    var Order = new OrderModel(OrderObj);
    Order.save(function (err, success) {
        if (!err) {
            console.log('from saving Order Object', success);
        }
        else {
            console.log('from err Order Object', err);
        }
    });
}
exports.SaveOrderObject = SaveOrderObject;
function findCompanyOrder() {
}
exports.findCompanyOrder = findCompanyOrder;
function FindOrderData(OrderObject) {
    var deferred = q.defer();
    OrderModel.find(OrderObject, function (err, res) {
        if (res) {
            deferred.resolve(res);
        }
        else {
            deferred.reject("Error occurred while saving user");
        }
    });
    return deferred.promise;
}
exports.FindOrderData = FindOrderData;
function FindCurrentEmployee(OrderObject) {
    return EmployeeSchema_1.FindEmployeeData(OrderObject);
}
exports.FindCurrentEmployee = FindCurrentEmployee;
