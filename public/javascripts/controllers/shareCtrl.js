app.controller('ShareCtrl', ['$scope', '$http', '$routeParams', 'navigationService', function($scope, $http, $routeParams, navigationService) {
    $scope.freinds = {};
    $scope.id = $routeParams.listId;
    navigationService.setClickRight(function(){
        console.log("meow2");
    });
    $http.get("/users/1/friends").success(function(data) {
      $scope.friends = data;
    });

    $scope.test = function(){
        console.log("meow");
    };
    $scope.friendClicked = function(friend){
        friend.selected = !friend.selected;
    };
}]);
