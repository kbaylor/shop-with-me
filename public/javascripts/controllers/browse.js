app.controller('BrowseCtrl', ['$scope', '$http',
  function($scope, $http) {
    $scope.test = "Hello World";
    
    $http.get("/products/all").success(function(data) {
      $scope.products = data;
    });
    
    $http.get("/productlist/user/1").success(function(data) {
      $scope.lists = data;
    });
    
    $scope.onChangeListItem = function(list) {
      $scope.selectedList = list;
    };
    
    $scope.getFullStarCount = function(rating) {
      return new Array(Math.floor(rating));   
    }
    
    $scope.getHalfStarCount = function(rating) {
      return (rating-Math.floor(rating)) >= 0.5 ? new Array(1) : new Array(0);
    }
    
    $scope.getEmptyStarCount = function(rating) {
      var totalCount = $scope.getFullStarCount(rating).length + $scope.getHalfStarCount(rating).length;
      return new Array(5-totalCount);
    }
  }
]);