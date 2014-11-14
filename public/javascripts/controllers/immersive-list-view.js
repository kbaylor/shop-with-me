app.controller('ImmersiveListCtrl', ['$scope', '$http', '$location', 'navigationService', '$routeParams', 'authenticationService',
  function($scope, $http, $location, navigationService, $routeParams, authenticationService) {
    var productListId = $routeParams.listId;
    
    $scope.commentForm = { commentText: "" };
    
    // Service call to get the list & list items
    $http.get('/productlist/' + productListId).success(function(productList) {
       navigationService.setTitle(productList.title);
    });

    $http.get('/productlist/' + productListId + '/products').success(function(products) {
       $scope.products = products;
    });
    
    $scope.addComment = function(commentText, product) {
      $scope.commentForm.commentText = "";
      $http.post('/comments/createcomment', {productId: product.id, creatorId: authenticationService.getCurrentUser().id, content: commentText }).success(function(data) {
        for (i=0; i<$scope.products.length; i++) {
          if ($scope.products[i].id == product.id) {
            // found the product to add comment to
            $scope.products[i].comments[$scope.products[i].comments.length] = data;
            break;
          }
        }
      });
    }
  }
]);