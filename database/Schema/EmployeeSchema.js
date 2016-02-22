var mongoose = require('mongoose');
var q = require("q");
//create Schema
var EmployeeSchema = new mongoose.Schema({
    email: String,
    userName: String,
    password: String,
    createdBy: String,
    companyId: String,
    companyName: String,
    phone: String,
    createdOn: { type: Date },
    employeeId: String
});
//compile Schema
var EmployeeModel = mongoose.model("Employee", EmployeeSchema);
//function saving object
function SaveEmployeeObject(EmployeeObj) {
    var user = new EmployeeModel(EmployeeObj);
    user.save(function (err, success) {
        if (!err) {
            console.log('from saving Employee Object', success);
        }
    });
}
exports.SaveEmployeeObject = SaveEmployeeObject;
//function finding Data by Email 
function FindEmployeeData(EmployeeObject) {
    var deferred = q.defer();
    EmployeeModel.find(EmployeeObject, function (err, res) {
        if (res) {
            deferred.resolve(res);
        }
        else {
            deferred.reject("Error occurred while saving user");
        }
    });
    return deferred.promise;
}
exports.FindEmployeeData = FindEmployeeData;
