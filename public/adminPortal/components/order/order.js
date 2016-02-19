
angular.module('app')
 .controller('OrderController', function($routeParams, $http , $rootScope , NgMap){
                var vm =this ;
       
     $http({
         method : 'POST',
         data : {             
            CompanyId :  $routeParams.empId  ,
           _id : $routeParams.orderid ,
            EmployeeId  : $routeParams.compId
         },
         url : './ViewOrder'            
     }).then(function success(response){
          vm.orderdata = response.data.user ; 
         
            NgMap.getMap().then(function(map) {
                console.log(map.getCenter());
                console.log('markers', map.markers);
                console.log('shapes', map.shapes);
        });
         
          
     } ,  function error(response){
         console.log(response);
     })
      this.click = function(event) {
          map.setZoom(10);
          map.setCenter(marker.getPosition()); 
    }
     
 });