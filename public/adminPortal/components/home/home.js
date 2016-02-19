angular.module('app')
    .controller('HomeController', [ '$http' ,'$rootScope' , '$location' , function ($http , $rootScope , $location) {
      //  console.log($rootScope.userID);
            $rootScope.userID =    localStorage.getItem('userID');
    }]);