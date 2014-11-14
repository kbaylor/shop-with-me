app.controller('ShareCtrl', ['$scope', '$http', '$routeParams',  '$location', '$timeout', 'authenticationService',
    function($scope, $http, $routeParams,  $location, $timeout, authenticationService) {

        var user = authenticationService.getCurrentUser();
        $scope.id = $routeParams.listId;
        $scope.endSubmitBtnText = "friend";
        $scope.totalSelected = 0;

        $http.get('/productlist/' + $scope.id + '/findunshared/user/'+user.id).success(function(eligibleFriends) {
            $scope.eligibleFriends = eligibleFriends;
            $http.get("/users/"+user.id+"/friends").success(function(data) {
                $scope.friends = [];
                var found = false;
                angular.forEach(data, function(friend) {
                    angular.forEach(eligibleFriends, function(eligible) {
                        if (friend.id == eligible.id) {
                            found = true;
                            return false; // continue hack
                        }
                    });
                    if (!found) {
                        friend.selected = true;
                        friend.alreadyShared = true;
                    }
                    found = false;
                    $scope.friends.push(friend);
                });
            });
        });

        $scope.friendClicked = function(friend) {
            if (friend.alreadyShared == null || !friend.alreadyShared) {
                $scope.totalSelected += (friend.selected)? -1 : 1;
                friend.selected = !friend.selected;
                $scope.endSubmitBtnText = ($scope.totalSelected > 1)? "friends" : "friend";
            }
        };

        $scope.submit = function() {
            var shares = [];
            var temp = {};
            angular.forEach($scope.friends, function(friend) {
                if (friend.selected && !friend.alreadyShared) {
                    temp = {
                        "friend_id": friend.id
                    }
                    shares.push(temp);
                }
            });
            if (shares.length > 0) {
                var x = {
                    productListId: $scope.id,
                    "friends": shares
                };
                $http.post('/productlist/sharelist', x);
                $timeout(function () {
                    $location.path('/lists/' + $scope.id);
                });
            }
        }
    }
]);
