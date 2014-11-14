app.controller('ListDetailCtrl', ['$scope', '$http', '$routeParams', '$location', '$timeout', 'navigationService',
   function($scope, $http, $routeParams, $location, $timeout, navigationService) {   
      var productListId = $routeParams.listId;

      $scope.products = [];
      
      // Service call to get the list & list items
      $http.get('/productlist/' + productListId).success(function(productList) {
         navigationService.setTitle(productList.title);
      });

      $http.get('/productlist/' + productListId + '/products').success(function(products) {
         $scope.products = products;
      });

      $scope.removeProduct = function(productId) {

         var productIndex = -1;

         $scope.products.forEach(function(product, index) { 
            if (product.id === productId) {
               productIndex = index;
            }
         });

         $scope.products.splice(productIndex, 1);
      
         // Service call to delete
         $http.post('/productlist/removeproduct', { productId: productId });
      };

      $scope.deleteList = function() {
         $http.post('/productlist/removeproductlist', { productListId: productListId });
      };

      $scope.addMore = function() {
        $timeout(function () {
         $location.path('/browse').search({selectedListId: productListId});
       });
      };

      $scope.share = function() {
        $timeout(function () {
         $location.path('/lists/' + productListId + '/share');
       });
      };

      navigationService.setButtons([
         {
           text: 'Add',
           handler: $scope.addMore
         },
         {
           text: 'Share',
           handler: $scope.share
         }
      ]);
   }
]);
