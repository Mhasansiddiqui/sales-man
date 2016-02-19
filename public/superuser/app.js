
angular.module('app' , ['ngNewRouter' , 'ngMaterial' ,  'firebase' ])
      .controller('AppController', ['$router', function ($router) {
        $router.config([        
            {path: '/CreateUser', component: 'user' },
            {path: '/login', component: 'login' },
             {path: '/', component: 'login' }
         
        ]);
    }])