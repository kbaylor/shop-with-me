app.controller('ShareCtrl', ['$scope', '$http', '$routeParams', 'navigationService', 'authenticationService',
    function($scope, $http, $routeParams, navigationService, authenticationService) {

        var user = authenticationService.getCurrentUser();
        $scope.id = $routeParams.listId;
        navigationService.setButtons([{
            text: 'Share with friends',
            handler: function() {
                //call here
                $scope.submit();
            }
        }]);
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
            if (friend.alreadyShared == null || !friend.alreadyShared)
                friend.selected = !friend.selected;
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
                navigationService.goBack();
            }
        }

        $scope.$on("$destroy", function() {
            navigationService.setButtons([]);
        });
    }
]);
