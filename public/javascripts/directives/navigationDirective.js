app.directive('swmNavigation', function (navigationService, $route) {
  return {
    restrict: "E",
    templateUrl: '/templates/navigation.html',
    link: function(scope, element, attrs, controllers) {
      scope.ns = navigationService;
    }
  };
});

app.directive('swmFooter', function (navigationService, $route, $location, $timeout) {
  return {
    restrict: "E",
    templateUrl: '/templates/footer.html',
    link: function(scope, element, attrs, controllers) {
      scope.clearHistory = function() {
        navigationService.setNextRouteChangeAsRoot();
      };
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

app.directive('swmNavActive', function ($window, $timeout) {
  return {
    restrict: "A",
    link: function(scope, element, attrs, controllers) {
      element.toggleClass('active', $window.location.hash == attrs['href']);
      scope.$on('$locationChangeSuccess', function(event) {
        element.toggleClass('active', $window.location.hash == attrs['href']);
      });
    }
  };
});

