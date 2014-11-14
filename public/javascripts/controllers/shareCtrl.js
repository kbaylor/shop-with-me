app.controller('ShareCtrl', ['$scope', function($scope) {

    $scope.friends = [{
        "name": "user1",
        "pic": "/images/user1.jpg",
        "selected": false
    }, {
        "name": "user2",
        "pic": "/images/user2.jpg",
        "selected": false
    }]

    $scope.friendClicked = function(friend){
        console.log(friend.name);
        friend.selected = !friend.selected;
    };
}]);