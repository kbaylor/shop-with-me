app.directive('swmNavigation', function (navigationService, $route) {
  return {
    restrict: "E",
    templateUrl: '/templates/navigation.html',
    link: function(scope, element, attrs, controllers) {
      scope.ns = navigationService;
    }
  };
});

app.directive('swmNavigationTitle', function (navigationService) {
  return {
    restrict: "A",
    link: function(scope, element, attrs, controllers) {
      navigationService.setTitle(attrs['swmNavigationTitle']);
    }
  };
});

app.directive('swmNavigationClearHistory', function (navigationService) {
  return {
    restrict: "A",
    link: function(scope, element, attrs, controllers) {
      navigationService.clearHistory();
    }
  };
});
