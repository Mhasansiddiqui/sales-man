angular.module('app')
    .controller('EmployeeController', [ '$routeParams' , '$rootScope', '$http' , '$mdToast' , 'tost' ,
     function ($routeParams ,$rootScope , $http , $mdToast , tost ) {    
        var vm = this ;
        $http({
            method: 'GET',        
            url: './CreateEmployee/?id='+ $routeParams.id
        }).then(function successCallback(response) {
            vm.data = response.data.user ;
        }, function errorCallback(response) {
        });                   
        this.CreateEmployee = function(){
            $http({
                method: 'POST',
                data : {
                    companyId :  $routeParams.id ,
                    email :     vm.email ,
                    userName :  vm.userName ,
                    password :  vm.password,
                    phone :  vm.phone ,
                    createdBy : $rootScope.userID
                },
                url: './CreateEmployee'
            }).then(function successCallback(response) {
                 tost.getTost('Employee Saved');
            }, function errorCallback(response) {
                 tost.getTost('Saving Employee Fail');
            });
        }     
    }]);