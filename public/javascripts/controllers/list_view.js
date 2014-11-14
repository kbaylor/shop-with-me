app.controller('ListDetailCtrl', ['$scope', '$http', '$routeParams',
   function($scope, $http, $routeParams) {

      $scope.products = [];
      
      // Service call to get the list & list items
      $http.get("/productlist/" + $routeParams.listId).success(function(productList) { 
         $scope.listName = productList.title; 
      });

      $http.get("/productlist/" + $routeParams.listId + "/products").success(function(products) { 
         $scope.products = products;
      });

      $scope.removeProduct = function(index) {
         $scope.products.splice(index, 1);
      
         // Service call to delete

      };
   }
]);
