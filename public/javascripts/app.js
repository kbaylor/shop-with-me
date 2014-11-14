var app = angular.module('app', [
  'ngRoute',
  'ngAnimate',
  'mobile-angular-ui'
]).config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/browse', {
        templateUrl: 'views/browse.html',
        controller: 'BrowseCtrl'
      }).
      when('/lists', {
        templateUrl: 'views/lists.html',
        controller: 'ListsCtrl'
      }).
      when('/incoming', {
        templateUrl: 'views/lists.html',
        controller: 'ListsCtrl'
      }).
      when('/notifications', {
        templateUrl: 'views/lists.html',
        controller: 'ListsCtrl'
      }).
      otherwise({
        redirectTo: '/browse'
      });
  }
]);
  
  