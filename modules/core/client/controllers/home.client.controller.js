'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
    $scope.isRol = function(rol) {
      var roles = $scope.authentication.user.roles;
      var isRol = false;
      for (var i in roles) {
        if (roles[i] === rol) {
          isRol = true;
        }
      }
      return isRol;
    };
  }
]);
