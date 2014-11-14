app.controller('ListsCtrl', ['$scope', '$http', '$routeParams', '$location', 'navigationService',
   function($scope, $http, $routeParams, $location, navigationService) {
      navigationService.setTitle("Your lists");
     
      // get lists for user
      $http.get("/productlist/user/1").success(function(data) {
        $scope.lists = data;
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
