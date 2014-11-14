app.service('navigationService', function($rootScope, $location){
  var _history = [];
  var _title = '';
  var _goingBack = false;
  var _buttons = [];
  var _setNextRouteChangeAsRoot = false;
  var self = this;
  
  $rootScope.$on('$locationChangeSuccess', function(event) {
    if (_goingBack) {
      _goingBack = false;
    } else {
      _history.push($location.url());
    }
    
    if (_setNextRouteChangeAsRoot) {
      _setNextRouteChangeAsRoot = false;
      self.clearHistory();
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
  
  this.setNextRouteChangeAsRoot = function() {
    _setNextRouteChangeAsRoot = true;
  }
  
  this.setTitle = function(title) {
    _title = title;
  };
  
  this.getTitle = function() {
    return _title;
  };
  
  this.setButtons = function(buttons) {
    _buttons = buttons;
  };
  
  this.getButtons = function() {
    return _buttons;
  };
});