var app = angular.module('app', [
  'ngRoute'
]);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/view1', {
        templateUrl: 'views/view1.html',
        controller: 'View1Ctrl'
      }).
      when('/view2', {
        templateUrl: 'views/view2.html',
        controller: 'View2Ctrl'
      }).
      otherwise({
        redirectTo: '/view1'
      });
  }]);
  
  