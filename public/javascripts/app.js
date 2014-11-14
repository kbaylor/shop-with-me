var app = angular.module('app', [
  'ngRoute',
  'ngAnimate'
]);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/browse', {
        templateUrl: 'views/browse.html',
        controller: 'BrowseCtrl'
      }).
      when('/view2', {
        templateUrl: 'views/view2.html',
        controller: 'View2Ctrl'
      }).
      otherwise({
        redirectTo: '/browse'
      });
  }]);
  
  