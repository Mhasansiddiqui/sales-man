/**
 * Created by Students on 2/2/2016.
 */
angular.module('app')
    .controller('CompanyController', ['$http' ,'$rootScope', '$mdToast' , 'tost',
     function ($http , $rootScope  ,$mdToast , tost  ) {
       var userid =   $rootScope.userID ;
        var vm = this;
        this.CreateCompany = function() {
            $http({
                method: 'POST',
                data: {
                    userId : userid ,
                    companyName: vm.CompanyName,
                    createdBy : vm.createdBy,
                },
                url: './CreateCompany'
            }).then(function successCallback(response) {         
                       
                tost.getTost('Company Created');
                       
            }, function errorCallback(response) {
                 tost.getErrorTost('Creating Company Fail');   
            });
        }
    }]);