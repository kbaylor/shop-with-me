app.controller('ShareCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.freinds = {};
    $http.get("/users/1/friends").success(function(data) {
        console.log(data);
      $scope.friends = data;
    });

    $scope.friendClicked = function(friend){
        friend.selected = !friend.selected;
    };
}]);
