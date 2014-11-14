app.controller('NotificationsCtrl', ['$scope', '$http',
  function($scope, $http) {
    $http.get("/notifications/user/1").success(function(data) {
      $scope.notifications = data;
      if (1) {
        $scope.notifications = [
          {
            type: 'SHARE',
            creation_date: 1415962500000,
            actor: {
              user_name: 'Ally',
              image_url: '/images/user1.jpg'
            },             
            related_object: {
              id: 42,
              title: 'Halloween Weekend'
            }
          },
          {
            type: 'COMMENT',
            creation_date: 1415952500000,
            actor: {
              user_name: 'Marky Mark',
              image_url: '/images/user2.jpg'
            },            
            related_object: {
              id: 42,
              title: 'Insp. Jacques Clouseau\'s magnifying glass',
              product_list_title: 'Pink Panther'
            }
          },
          {
            type: 'RECOMMENT',
            creation_date: 1415852500000,
            actor: {
              user_name: 'John',
              image_url: '/images/user3.jpg'
            },
            related_object: {
              id: 43,
              title: 'Ten Gallon Cowboy Hat',
              product_list_title: 'Blue Steel',
              product_list_owner: 'Derek'
            }
          }
        ];
      }
    });
    
    $scope.getMoment = function(timestamp) {
      return moment(timestamp).fromNow();
    };
  }
]);
