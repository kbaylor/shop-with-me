app.service('navigationService', function($rootScope, $location){
  var _history = [];
  var _title = '';
  var _goingBack = false;
  
  $rootScope.$on('$locationChangeSuccess', function(event) {
    if (_goingBack) {
      _goingBack = false;
    } else {
      _history.push($location.url());
    }
  });

  this.clearHistory = function() {
    if (this.canGoBack()) {
      // Remove all but the current location.
      _history = [_history[_history.length-1]];
    }
  };

  this.canGoBack = function() {
    return _history.length > 1;
  };
  
  this.goBack = function() {
    if (this.canGoBack()) {
      _history.pop();
      _goingBack = true;
      $location.url(_history[_history.length - 1]);
    }
  };
  
  this.setTitle = function(title) {
    _title = title;
  };
  
  this.getTitle = function() {
    return _title;
  };
});