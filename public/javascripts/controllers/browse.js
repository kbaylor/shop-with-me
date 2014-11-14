app.controller('BrowseCtrl', ['$scope', '$http', '$location', 'navigationService', 'authenticationService',
  function($scope, $http, $location, navigationService, authenticationService) {
    $scope.newListForm = { newListTitle: "" };
    
    var currentUser = authenticationService.getCurrentUser();

    $http.get("/products/all").success(function(data) {
      $scope.products = data;
    });
    
    $http.get("/productlist/user/" + currentUser.id).success(function(data) {
      $scope.lists = data;
      
      for (i=0; i < $scope.lists.length; i++) {
        if ($scope.lists[i].id == $location.search().selectedListId) {
          $scope.selectedList = $scope.lists[i];
        }
        
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
      $scope.newListForm.newListTitle = "";
      $http.post("productlist/create", {title: newListTitle, ownerId: currentUser.id}).success(function(data) {
        var list = data.list;
        list.products = [];
        $scope.lists[$scope.lists.length] = list;
        $scope.selectedList = list;
        $scope.modalShown = false;
      });
    }
    
    $scope.addProductToList = function(product, selectedList) {
      $http.post("productlist/addproduct", { productListId: selectedList.id, productAsin: product.asin }).success(function() {
        for (i=0; i < $scope.lists.length; i++) {
          if ($scope.lists[i].id == selectedList.id) {
            $scope.lists[i].products[$scope.lists[i].products.length] = product;
            break;
          }
        }
      });
    }
  }
]);

app.filter('filterNotOnList', function() {
  return function(products, selectedList) {
    var notInSelectedList = [];
    if (selectedList) {
      var notInSelectedList = [];
      for (var i=0; i<products.length; i++) {
        for (var j=0; j<selectedList.products.length; j++) {
          var isInList = 0;
          if (products[i].asin === selectedList.products[j].asin) {
            isInList = 1;
            break;
          }
        }
        if (!isInList) {
          notInSelectedList[notInSelectedList.length] = products[i];
        }
      }
    } else {
      return products;
    }
    return notInSelectedList;
  }
});