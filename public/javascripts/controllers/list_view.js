app.controller('ListDetailCtrl', ['$scope', '$http', '$routeParams', '$location', '$timeout', 'navigationService', 'authenticationService',
   function($scope, $http, $routeParams, $location, $timeout, navigationService, authenticationService) {   
      var productListId = $routeParams.listId;
      $scope.productListId = productListId;
      $scope.isMyList;
      $scope.userId = authenticationService.getCurrentUser().id;   

      // current voting index.
      $scope.currentIndex = 0;
      
      // Do not set to false until we know it is false. The view differentiates null/false/true.
      $scope.isVoting = null;

      $scope.products = [];
      $scope.nonvotedProducts = [];
      $scope.addMoreText = "add more products";//default
      
      // Service call to get the list & list items
      $http.get('/productlist/' + productListId).success(function(productList) {
        $scope.isMyList = productList.owner_id == $scope.userId;
        navigationService.setTitle(productList.title);
      });

      $http.get('/productlist/' + productListId + '/products').success(function(products) {
        $scope.products = products;
        
        if ($scope.isMyList) {
          $scope.isVoting = false;
          $scope.addMoreText = ($scope.products.length < 1)? "add first product" : "add more products";
        } else {
          $http.get('/vote/nonvotedproducts/productlist/' + productListId + '/user/' + $scope.userId).success(function(nonvotedProducts) {
            var count = 0;
            $.each(nonvotedProducts, function(i, product) { product.index = count++ });
            $scope.nonvotedProducts = nonvotedProducts;
            $scope.isVoting = nonvotedProducts.length > 0;
          });
        }
      });

      $scope.removeProduct = function(productId) {

         var productIndex = -1;

         $scope.products.forEach(function(product, index) { 
            if (product.id === productId) {
               productIndex = index;
            }
         });

         $scope.products.splice(productIndex, 1);
         if ($scope.products.length < 1){
            $scope.addMoreText = "add first product";
         }
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
        if($scope.products.length > 0) {
          $timeout(function () {
           $location.path('/lists/' + productListId + '/share');
         });
        }
      };
      
      $scope.launchImmersiveView = function(index) {
        $location.path('/lists/' + productListId + '/' + index);
      }

      $scope.handleSwipe = function(direction) {
        handleSwipe($scope, direction);
      }
      
      /** Vote code **/
      $scope.handleSuccess = function() {
        $scope.$apply(function() {
          $scope.isVoting = false;
        });
      };
   }
]);

var handleSwipe = function(scope, swipeDirection) {
  function castVote(productID, currentUser, decision) {
    $.ajax({
      url: "/vote/performvote",
      type: "POST",
      data: {
        productId: productID,
        voterId: currentUser,
        vote: decision
      },
      error: function(err) {
        console.log(err);
      }
    })
  };
  var product = scope.nonvotedProducts[scope.currentIndex];

  if (product.comment) {
    $.ajax({
      url: "/comments/createcomment",
      type: "POST",
      data: {
        productId: product.id,
        creatorId: scope.userId,
        content: product.comment
      },
      error: function(err) {
        console.log(err);
      }
    });
  }
  var options = {
    opacity:'0.2',
    height:'100px',
    width:'100px',
    borderColor:'white'
  };
  if (swipeDirection === 'left') {
    options.marginLeft = '-=400px';
    castVote(product.id, scope.userId, -1);
  } else {
    options.marginLeft = '+=400px';
    castVote(product.id, scope.userId, 1);
  }

  $("#product" + scope.currentIndex).animate(options, 400, function() {
    scope.$apply(function() {
      scope.currentIndex += 1;
      if (scope.currentIndex < scope.nonvotedProducts.length) {
        $("#product" + scope.currentIndex).fadeIn();
      } else {
        $.ajax({
          url: "/vote/finish",
          type: "POST",
          data: {
            productListId: scope.productListId,
            voterId: scope.userId
          },          
          success: function() {
            scope.handleSuccess();
          },
          error: function(err) {
            console.log(err);
          }
        });
      }
    });
  });
}

