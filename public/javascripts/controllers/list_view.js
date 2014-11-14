app.controller('ListDetailCtrl', ['$scope', '$http', '$routeParams', '$location', '$timeout', 'navigationService', 'authenticationService',
   function($scope, $http, $routeParams, $location, $timeout, navigationService, authenticationService) {   
      var productListId = $routeParams.listId;
      var isMyList;
      $scope.userId = authenticationService.getCurrentUser().id;   

      // current voting index.
      $scope.currentIndex = 0;
      
      // Do not set to false until we know it is false. The view differentiates null/false/true.
      $scope.isVoting = null;

      $scope.products = [];
      $scope.nonvotedProducts = [];
      
      // Service call to get the list & list items
      $http.get('/productlist/' + productListId).success(function(productList) {
        isMyList = productList.owner_id == $scope.userId;
        navigationService.setTitle(productList.title);
      });

      $http.get('/productlist/' + productListId + '/products').success(function(products) {
        $scope.products = products;
        
        if (isMyList) {
          $scope.isVoting = false;
          $scope.addMoreText = ($scope.products.length < 1)? "add first product" : "add more products";
        } else {
          $http.get('/vote/nonvotedproducts/productlist/' + productListId + '/user/' + $scope.userId).success(function(nonvotedProducts) {
            var count = 0;
            $.each(nonvotedProducts, function(i, product) { product.index = count++ });
            $scope.nonvotedProducts = nonvotedProducts;
            $scope.isVoting = nonvotedProducts.length > 0;
            if ($scope.isVoting) {
              $timeout(function(){
                initSwiper($scope);
              });  
            }
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
      
      /** Vote code **/
      $scope.handleSuccess = function() {
        $scope.$apply(function() {
          $scope.isVoting = false;
        });
      };
   }
]);

var initSwiper = function($scope) {
  var scope = $scope;
  $(function() {
    $(".metadata" + scope.currentIndex).show();
    $(".productContainer").swipe({
      swipe: function(event, direction, distance, duration, fingerCount) {
        if (duration > 200 && distance > 200) {
          var product = scope.nonvotedProducts[scope.currentIndex];

          if (product.comment) {
            $.ajax({
              url: "/comments/createcomment",
              type: "POST",
              data: {
                productId: product.productId,
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
          if (direction === 'left') {
            options.marginLeft = '-=400px';
            castVote(product.id, scope.userId, -1);
          } else {
            options.marginLeft = '+=400px';
            castVote(product.id, scope.userId, 1);
          }

          this.animate(options, 400, function() {
            scope.$apply(function() {
              scope.currentIndex += 1;
              if (scope.currentIndex < scope.nonvotedProducts.length) {
                $("#product" + scope.currentIndex).fadeIn();
              } else {
                $.ajax({
                  url: "/vote/finish",
                  type: "POST",
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
      }
    });

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
    }

  });
};

