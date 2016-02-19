angular.module('app', ['ngMaterial'])
.controller('AppCtrl', function($scope) {
     $scope.admin = '/admin';
     $scope.superadmin = '/superuser';
});