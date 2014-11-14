var app = angular.module('app', [
  'ngRoute',
  'ngAnimate',
  'ngTouch',
  'mobile-angular-ui'
]);

app.config(['$routeProvider',

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
      when('/lists/:listId', {
        templateUrl: 'views/list_view.html',
        controller: 'ListDetailCtrl'
      }).
      otherwise({
        redirectTo: '/browse'
      });
  }
]);
  
  