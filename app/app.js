var myNinjaApp = angular.module('myNinjaApp', ['ngRoute', 'ngAnimate']);
// The module is a container for all the components, like controllers, config, run methods

// The config method fires a load of code before your app runs (before all your other app files load)
myNinjaApp.config(['$routeProvider', function($routeProvider) {

  //$locationProvider.html5Mode(true); // html5Mode is based on the html5 history API, which allows us to set a url on the same domain w/ JS

  $routeProvider
    .when('/home', {
      templateUrl: 'views/home.html',
      controller: 'NinjaController'
    })
    .when('/contact', {
      templateUrl: 'views/contact.html',
      controller: 'ContactController'
    })
    .when('/contact-success', {
      templateUrl: 'views/contact-success.html',
      controller: 'ContactController'
    })
    .when('/directory', {
      templateUrl: 'views/directory.html',
      controller: 'NinjaController'
    }).otherwise({
      redirectTo: '/home'
    });

}]);

// myNinjaApp.run(function(){
//
//
// });

// The scope object is the binding part between the html view and the controller
// The controller is passing the data thru via the scope object
// We're passing the scope thru as a dependency in the controller bc we're depending on it.
// To protect the scope variable from minification, we pass the function and any dependencies thru as an array after the controller name

myNinjaApp.directive('randomNinja', [function() {

  return {
    restrict: 'E',  // 'EA': use the directive as an element OR an attribute
    scope: {
      ninjas: '=',
      title: '='
    },
    templateUrl: 'views/random.html',
    transclude: true,
    replace: true,
    controller: function($scope) {
      $scope.random = Math.floor(Math.random() * 4);
    }
  };

}]);

myNinjaApp.controller('NinjaController', ['$scope', '$http', function($scope, $http) {

  $scope.removeNinja = function(ninja) {
    var removedNinja = $scope.ninjas.indexOf(ninja);
    $scope.ninjas.splice(removedNinja, 1);
  }

  $scope.addNinja = function() {
    $scope.ninjas.push({
      name: $scope.newninja.name,
      belt: $scope.newninja.belt,
      rate: parseInt($scope.newninja.rate),
      available: true
    });

    $scope.newninja.name = "";
    $scope.newninja.belt = "";
    $scope.newninja.rate = "";

  };

  $scope.removeAll = function() {
    $scope.ninjas = [];
  };

  $http.get('data/ninjas.json').then(function(response) {
    $scope.ninjas = response.data;
  });

}]);

myNinjaApp.controller('ContactController', ['$scope', '$location', function($scope, $location) {

  $scope.sendMessage = function() {
    $location.path('/contact-success');
  };

}]);
