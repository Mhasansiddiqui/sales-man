angular.module('app')
    .controller('LoginController', function ($http,$location,$rootScope   ) {          
    var ref = new Firebase("https://sales-man.firebaseio.com");    
    this.login = function(){
            ref.authWithOAuthPopup("google", function(error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            } else {
               if(authData.uid === 'google:113385733984557988389'){
                  $rootScope.status = true ;
                 console.log('can login');     
                   $location.path('/CreateUser');             
                    $rootScope.$apply();
                }
            }
        });
    }
    });
