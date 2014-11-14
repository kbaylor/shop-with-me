app.controller('ListsCtrl', ['$scope', '$http', '$routeParams', '$location', 'navigationService',
   function($scope, $http, $routeParams, $location, navigationService) {
      
      if ($location.path().indexOf("incoming") != -1) {
        navigationService.setTitle("Incoming lists");
        // get lists for user
        $http.get("/productlist/share/user/1").success(function(data) {
          $scope.lists = data;
        });
      } else {
        navigationService.setTitle("Your lists");
        // get lists for user
        $http.get("/productlist/user/1").success(function(data) {
          $scope.lists = data;
        });
      }
      

      $scope.deleteList = function(list) {
        if ($location.path().indexOf("incoming") == -1) {
          // only allow deleting on your own lists
          $http.post('/productlist/removeproductlist', { productListId: list.id }).success(function() {
            for (i=0; i<$scope.lists.length; i++) {
              if($scope.lists[i].id == list.id) {
                $scope.lists.splice(i, 1);
                break;
              }
            }
          });
        }
      };
      
      $scope.navigateToListView = function(list) {
        $location.path('/lists/' + list.id);
      }
   }
]);
