app.controller('LoginCtrl', ['$scope', '$http', '$location', 'authenticationService',
  function($scope, $http, $location, authenticationService) {

    $scope.login = function() {
      $http.get('/users?email=' + $scope.email).success(function(data) {
        // Set user
        authenticationService.setCurrentUser(data);

        // Redirect
        $location.path('/browse');
      });
    };
  }]);