app.controller('ShareCtrl', ['$scope', function($scope) {

    $scope.friends = [{
        "name": "user1",
        "pic": "/images/user1.jpg",
        "selected": false
    }, {
        "name": "user2",
        "pic": "/images/user2.jpg",
        "selected": false
    },
    {
        "name": "user3",
        "pic": "/images/user3.jpg",
        "selected": false
    }]

    $scope.friendClicked = function(friend){
        friend.selected = !friend.selected;
    };
}]);
