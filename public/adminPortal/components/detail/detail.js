angular.module('app')
    .controller('DetailController', function (OrderDetailService, ComanyDetailService, FBURL, $timeout, $mdSidenav, $log, $routeParams) {
        var id = $routeParams.id;
        var vm = this;                
        ComanyDetailService.ComanyDetail(id).then(function successCallback(response) {
          //  console.log(response.data.user);
            vm.data = response.data.user;
        }, function errorCallback(response) {
        });                
        OrderDetailService.$loaded(
            function (x) {
                console.log(x);
                
               vm.Orders = x ;     
            }, function (error) {
                console.error("Error:", error);
            });           
                        
        this.toggleLeft = buildDelayedToggler('left');
        function debounce(func, wait, context) {
            var timer;

            return function debounced() {
                var context = this,
                    args = Array.prototype.slice.call(arguments);
                $timeout.cancel(timer);
                timer = $timeout(function () {
                    timer = undefined;
                    func.apply(context, args);
                }, wait || 10);
            };
        }
        function buildDelayedToggler(navID) {
            return debounce(function () {
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {

                    });
            }, 200);
        }               
    }).service('ComanyDetailService', function ($http) {
        var vm = this;
        this.ComanyDetail = function (id) {
            return $http({
                method: 'GET',
                url: './detail/?id=' + id
            })
        }
    }).service('OrderDetailService', function (FBURL, $firebaseArray, $rootScope) {
        var ref = new Firebase(FBURL);
        var a = $firebaseArray(ref.child('Orders').child($rootScope.userID));
        return a;
    })
    .directive("company", function () {
        return {         
            templateUrl: 'components/detail/sideNav.html'
        };
    }).constant('FBURL', 'https://sales-man.firebaseio.com/')    
    .directive("counterClick" ,function(FBURL  ,$firebaseArray , $rootScope ){                     
            return {
            link: function (scope, element, attrs) {
                scope.count = 10;      
                element.bind('click', function () {          
                    var counter = setInterval(function () {                        
                        scope.count -= 1;                                                
                        if (scope.count == 0) {
                            var compId = scope.e.CompanyId;
                            var ref = new Firebase(FBURL);
                            var list = $firebaseArray(ref.child('Orders').child($rootScope.userID).child(compId));
                            list.$loaded(
                                function (x) {
                                    list.$remove(scope.$index).then(function (ref) {                                      
                                  
                                 });
                                }, function (error) {
                                    console.error("Error:", error);
                                });
                            clearInterval(counter);
                        }
                        scope.$apply(function () {
                            scope.count;                           
                        });
                        $rootScope.$apply();
                    }, 1000)
                 })
              }
            }
    })