app.controller('BrowseCtrl', ['$scope', '$http',
  function($scope, $http) {
    $scope.test = "Hello World";
    
    $http.get("/products/all").success(function(data) {
      $scope.products = data;
    });
    
    $http.get("/productlist/user/1").success(function(data) {
      $scope.lists = data;
      
      for (i=0; i < $scope.lists.length; i++) {
        (function(index) {
          $http.get("/productlist/" + $scope.lists[index].id + "/products").success(function(data) {
            $scope.lists[index].products = data;
          });
        })(i);
      }
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
    
    $scope.isProductOnSelectedList = function(selectedList, asin) {
      if (selectedList) {
        for (i=0; i<selectedList.products.length; i++) {
          if (selectedList.products[i].asin === asin) {
            return 1;
          }
        }
      }
      
      return 0;
    }
    
    $scope.modalShown = false;
    
    $scope.toggleModal = function() {
      $scope.modalShown = !$scope.modalShown;
    }
    
    $scope.saveNewList = function(newListTitle) {
      $scope.modalShown = false;
    }
  }
]);