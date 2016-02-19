var mongoose = require('mongoose');
var q = require("q");
var FirebaseTokenGenerator = require("firebase-token-generator");
//create Schema
var UserSchema = new mongoose.Schema({
    email: String,
    userName: String,
    password: String,
    createdBy: String,
    createdOn: { type: Date, default: Date.now },
    sid: String
});
//compile Schema
var UserModel = mongoose.model("User", UserSchema);
//function saving object
function SaveUserObject(UserObj) {
    var user = new UserModel(UserObj);
    user.save(function (err, success) {
        if (!err) {
            console.log('from saving User Object', success);
        }
        else {
            console.log('from err User Object', err);
        }
    });
}
exports.SaveUserObject = SaveUserObject;
//function finding Data by Email 
function FindUserData(UserObject) {
    UserModel.find(UserObject, function (err, res) {
        res.forEach(function (UserObject) {
        });
    });
}
exports.FindUserData = FindUserData;
function FindOneUserData(UserObject) {
    var deferred = q.defer();
    UserModel.findOne(UserObject, function (err, res) {
        if (res) {
            var tokenGenerator = new FirebaseTokenGenerator("fmg2oEE1C1f7n4875ri5IucpBlnlt5oC3f3OyuPH");
            var token = tokenGenerator.createToken({ uid: res.sid });
            var result = { usertoken: token, user: res };
            deferred.resolve(result);
        }
        else {
            deferred.reject("Error occurred while saving user");
        }
    });
    return deferred.promise;
}
exports.FindOneUserData = FindOneUserData;
