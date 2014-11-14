app.controller('VoteCtrl', ['$scope', '$http', '$routeParams', '$timeout', 'navigationService', 'authenticationService',
  function($scope, $http, $routeParams, $timeout, navigationService, authenticationService) {
    var productListId = $routeParams.listId,
      user = authenticationService.getCurrentUser();
    
    $scope.currentIndex = 0;

    // Service call to get the list & list items
    $http.get('/productlist/' + productListId).success(function(productList) {
       navigationService.setTitle(productList.title);
    });

    $http.get('/productlist/' + productListId + '/products').success(function(products) {
      var count = 0;
      $.each(products, function(i, product) { product.index = count++ });
      $scope.products = products;
      
      $timeout(function(){
        initSwiper($scope, user);
      });        
    });    
    
    $scope.handleSuccess = function() {
      console.log('handle success');
    };
  }
]);

var initSwiper = function($scope, user) {
  var scope = $scope;
  $(function() {
    var currentUser = user.id;
    $(".metadata" + scope.currentIndex).show();
    $(".productContainer").swipe({
      swipe: function(event, direction, distance, duration, fingerCount) {
        if (duration > 100 && distance > 100) {
          var product = scope.products[scope.currentIndex];
          console.log(product.comment);
          if (product.comment) {
            $.ajax({
              url: "/comments/createcomment",
              type: "POST",
              data: {
                productId: product.id,
                creatorId: currentUser,
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
            castVote(product.id, currentUser, -1);
          } else {
            options.marginLeft = '+=400px';
            castVote(product.id, currentUser, 1);
          }

          this.animate(options, 400, function() {
            scope.$apply(function() {
              scope.currentIndex += 1;
              if (scope.currentIndex < scope.products.length) {
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
      });
    };

  });
};

