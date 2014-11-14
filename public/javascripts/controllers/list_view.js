app.controller('ListDetailCtrl', ['$scope', '$http', '$routeParams', '$location', 'navigationService',
   function($scope, $http, $routeParams, $location, navigationService) {

      var productListId = $routeParams.listId;

      $scope.products = [];
      
      // Service call to get the list & list items
      $http.get('/productlist/' + productListId).success(function(productList) {
         navigationService.setTitle(productList.title);
      });

      $http.get('/productlist/' + productListId + '/products').success(function(products) {
         $scope.products = products;
      });

      $scope.removeProduct = function(index) {

         var productId = $scope.products[index].id;
         $scope.products.splice(index, 1);
      
         // Service call to delete
         $http.post('/productlist/removeproduct', { productId: productId });
      };

      $scope.deleteList = function() {
         $http.post('/productlist/removeproductlist', { productListId: productListId });
      };

      $scope.addMore = function() {
         $location.path('/browse').search({selectedListId: productListId});
      };

      $scope.share = function() {
         $location.path('/lists/' + productListId + '/share');
      };
   }
]);
