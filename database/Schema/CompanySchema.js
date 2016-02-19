var mongoose = require('mongoose');
var q = require("q");
//create Schema
var companySchema = new mongoose.Schema({
    companyName: String,
    createdBy: String,
    createdOn: { type: Date, default: Date.now },
    userId: String
});
//compile Schema
var CompanyModel = mongoose.model("Company", companySchema);
//function saving object
function SaveComapnyObject(UserObj) {
    var company = new CompanyModel(UserObj);
    company.save(function (err, success) {
        if (!err) {
            console.log('from saving Company Object', success);
        }
    });
}
exports.SaveComapnyObject = SaveComapnyObject;
//function finding Data by Company Name 
function FindCompanyData(UserObject) {
    var deferred = q.defer();
    CompanyModel.find(UserObject, function (err, res) {
        if (res) {
            deferred.resolve(res);
        }
        else {
            deferred.reject("Error occurred while saving user");
        }
    });
    return deferred.promise;
}
exports.FindCompanyData = FindCompanyData;
