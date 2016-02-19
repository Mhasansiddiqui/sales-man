/**
 * Created by Students on 2/2/2016.
 */
angular.module('app', ['ngNewRouter' , 'ngMaterial',  'ngMap' , 'firebase' , 'md.data.table'  ])
    .controller('AppController', ['$router' ,'$location' , '$rootScope' , function ($router , $location  , $rootScope) {
        
        this.logOut = function(){
             localStorage.clear();
             $location.path('/login');
             $rootScope.status = false;
        }
        
        $router.config([
            {path: '/', component: 'home' },
            {path: '/home', component: 'home' },
            {path: '/CreateCompany', component: 'company' },
            {path: '/CreateUser', component: 'user' },
            { path: '/detail/:id', component: 'detail' },
            {path: '/CreateEmployee/:id' , component: 'employee' },
            {path: '/login', component: 'login' },
             {path: '/Order/:empId/:compId', component: 'order' }
        ]);
    }])
    .run(function($location,$rootScope){
        
        $rootScope.status = false;
        if(localStorage.getItem('userToken') == null) {
            $location.path('/login');
            $rootScope.status = false;
        }
        else {
            $rootScope.userID =    localStorage.getItem('userID');
            $location.path('/detail/' + $rootScope.userID);
            $rootScope.status = true;
            
        }
    }).config(function(){

   } ).service('tost' , function($mdToast){             
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