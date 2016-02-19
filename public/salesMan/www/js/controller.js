angular.module('starter')
 .controller('HomeController' , function(){
     console.log('home');
 })
 .controller('LoginController' , function($rootScope, $state,$http){ 
     var vm =  this;          
     this.Login = function(){                
                       $http({
                method: 'POST',
                data: {
                    password: vm.password,
                    userName: vm.username
                },
                url: './login'
            }).then(function successCallback(response) {   
                console.log(response);                               
                 var object = response.data.user[0];                                   
                 $rootScope._id = object._id ;                                 
                 $rootScope.companyId = response.data.user[0].companyId ;
                 $rootScope.ownerId = response.data.user[0].createdBy ;                
                 localStorage.setItem('UserId' ,  $rootScope._id ) ;                 
                 $state.go('Order');
            }, function errorCallback(response) {
                console.log('can,t login');
            })
        }            
 }).controller('OrderController' , function($http , $scope , $rootScope , GeoLocation,$firebaseArray){ 
       var vm = this ;
       var fb = new Firebase("https://sales-man.firebaseio.com/"); 
       this.CreateOrder = function(){        
        //Create User List 
       var userrefrence =  $firebaseArray( fb.child('Orders').child($rootScope.ownerId) .child($rootScope.companyId) );  
       //Create User Data  
       userrefrence.$add({                            
                    Name :  vm.name ,
                    Quantity : vm.quantity ,      EmployeeId : $rootScope._id ,              
                    CompanyId : $rootScope.companyId,
                    Longitude : ""+ $rootScope.latitude,
                    Latitude : ""+ $rootScope.longitude ,
                    LocationName :  "" + $rootScope.formatedAddress
                    
       })                       
            $http({
                method: 'POST',
                data : {                
                    Name :  vm.name ,
                    Quantity : vm.quantity ,
                    EmployeeId : $rootScope._id ,
                    CompanyId : $rootScope.companyId,
                    Longitude : ""+ $rootScope.latitude,
                    Latitude : ""+ $rootScope.longitude ,
                    LocationName :  "" + $rootScope.formatedAddress                      
                },
                url: './CreateOrder'
            }).then(function successCallback(response) {
                        console.log('save data ' , response);
            }, function errorCallback(response) {

            });
         }
         
 }).service('GeoLocation' , function($rootScope){
       function success(pos) {
              var crd = pos.coords;
                geocoder = new google.maps.Geocoder();
                $rootScope.latitude = crd.latitude;
                $rootScope.longitude = crd.longitude;
                var latlng = new google.maps.LatLng(crd.latitude, crd.longitude);
                geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        $rootScope.formatedAddress = results[0].formatted_address;          
                        //  console.log(results); 
                            }
                });
            };
            function error(err) {
                console.warn('ERROR(' + err.code + '): ' + err.message);
            };
            navigator.geolocation.getCurrentPosition(success, error);  
 })
 