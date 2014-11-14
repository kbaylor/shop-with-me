var app = angular.module('app', [
  'ngRoute',
  'ngAnimate',
  'ngTouch',
  'mobile-angular-ui',
  'LocalStorageModule'
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
      when('/lists/:listId/share', {
        templateUrl: 'views/share.html',
        controller: 'ShareCtrl'
      }).
      when('/notifications', {
        templateUrl: 'views/notifications.html',
        controller: 'NotificationsCtrl'
      }).
      when('/lists/:listId', {
        templateUrl: 'views/list_view.html',
        controller: 'ListDetailCtrl'
      }).
      when('/lists/:listId/vote', {
        templateUrl: 'views/vote.html',
        controller: 'VoteCtrl'
      }).
      when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      }).
      when('/lists/:listId/:itemIndex', {
        templateUrl: 'views/immersive-list-view.html',
        controller: 'ImmersiveListCtrl'
      }).
      otherwise({
        redirectTo: '/login'
      });
  }
]);
  
  