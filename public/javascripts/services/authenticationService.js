app.service('authenticationService', function($rootScope, $location, localStorageService){
  var _currentUser,
    userStorageKey = 'currentUser';

  this.setCurrentUser = function(user) {
    localStorageService.set(userStorageKey, user);

    _currentUser = user;
  };

  this.getCurrentUser = function() {
    if (_currentUser) {
      return _currentUser;
    }

    // Get from local storage
    var tempUser = localStorageService.get(userStorageKey);

    if (tempUser) {
      return tempUser;
    }

    $location.path('/login');
  };
});