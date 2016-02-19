angular.module('app')
 .controller('UserController', ['$http' , '$mdToast' ,'tost' ,function ($http ,$mdToast , tost ) {
        this.name = 'hasan';
        var vm = this ;
        this.CreateUser = function(){   
            $http({
                method: 'POST',
                data : {
                    username : vm.userName ,
                    password : vm.password ,
                    email : vm.email,
                    createdOn : vm.createdOn
                },
                url: './CreateUser'
            }).then(function successCallback(response) {
               tost.getTost('User Saved');
            }, function errorCallback(response) {
                 tost.getErrorTost('Saving User Fail ');
            });
        } 
    }]).service('tost' , function($mdToast){             
       this.getTost = function(msg){          
               $mdToast.show(
                    $mdToast.simple()
                    .textContent(msg)                   
                    .hideDelay(3000)
                );
       }      
       this.getErrorTost = function(msg){          
               $mdToast.show(
                    $mdToast.simple()
                    .textContent(msg)                   
                    .hideDelay(3000)
                );
             }      
       })