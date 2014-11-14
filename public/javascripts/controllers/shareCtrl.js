app.controller('ShareCtrl', ['$scope', '$http', '$routeParams', 'navigationService', function($scope, $http, $routeParams, navigationService) {
    $scope.id = $routeParams.listId;
    $scope.friends = [];
    navigationService.setButtons([{
        text: 'Share with friends',
        handler: function() {
            //call here
            console.log('Handle add');
        }
    }]);
    $http.get("/users/1/friends").success(function(data) {
        angular.forEach(data, function(friend) {
            if(friend.name == "Susan"){
              friend.selected = true;
              friend.alreadyShared = true;  
            }
            $scope.friends.push(friend);
        });

    });

    $scope.friendClicked = function(friend) {
        if(friend.alreadyShared == null || !friend.alreadyShared)
            friend.selected = !friend.selected;
    };
}]);
