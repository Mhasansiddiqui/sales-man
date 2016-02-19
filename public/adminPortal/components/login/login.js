angular.module('app')
    .controller('LoginController', function ($http,$location,$rootScope  ) {
        var vm = this;
        this.login = function () {
            $http({
                method: 'POST',
                data: {
                    password: vm.password,
                    email: vm.email
                },
                url: './login'
            }).then(function successCallback(response) {
              
                if (response.data.status == true) {
                    
                    $rootScope.userID = response.data.user.user._id;                  
                    $location.path('/detail/' + $rootScope.userID);
                    localStorage.setItem('userToken', response.data.user.usertoken);
                    localStorage.setItem('userID', $rootScope.userID);
                    $rootScope.status = true;
                }
                else {
                    $location.path('/login')
                }
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        }


    })
