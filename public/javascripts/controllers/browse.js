app.controller('BrowseCtrl', ['$scope', '$http',
  function($scope, $http) {
    $scope.test = "Hello World";
    
    $http.get("/products/all").success(function(data) {
      $scope.products = data;
    });
  }
]);