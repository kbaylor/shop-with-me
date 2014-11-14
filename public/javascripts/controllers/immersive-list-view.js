app.controller('ImmersiveListCtrl', ['$scope', '$http', '$location', 'navigationService', '$routeParams',
  function($scope, $http, $location, navigationService, $routeParams) {
    var productListId = $routeParams.listId;
    
    // Service call to get the list & list items
    $http.get('/productlist/' + productListId).success(function(productList) {
       navigationService.setTitle(productList.title);
    });

    $http.get('/productlist/' + productListId + '/products').success(function(products) {
       $scope.products = products;
    });
  }
]);