app.controller('ShareCtrl', ['$scope', '$http', '$routeParams', 'navigationService', 'authenticationService',
    function($scope, $http, $routeParams, navigationService, authenticationService) {

        var user = authenticationService.getCurrentUser();
        $scope.id = $routeParams.listId;
        
        navigationService.setButtons([{
            text: 'Share with friends',
            handler: function() {
                //call here
                console.log('Handle add');
            }
        }]);
        $http.get("/users/" + user.id + "/friends").success(function(data) {
            $scope.friends = [];
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
    }]
);
