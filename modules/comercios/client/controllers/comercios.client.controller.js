'use strict';

// Comercios controller
angular.module('comercios').controller('ComerciosController', ['$scope', '$stateParams', '$location', 'Authentication', 'Comercios',
  function ($scope, $stateParams, $location, Authentication, Comercios) {
    $scope.authentication = Authentication;

    // Create new Comercio
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'comercioForm');

        return false;
      }

      // Create new Comercio object
      var comercio = new Comercios({
        IdComercio: this.IdComercio,
        content: this.content
      });

      // Redirect after save
      comercio.$save(function (response) {
        $location.path('comercios/' + response._id);

        // Clear form fields
        $scope.IdComercio = '';
        $scope.content = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing Comercio
    $scope.remove = function (comercio) {
      if (comercio) {
        comercio.$remove();

        for (var i in $scope.comercios) {
          if ($scope.comercios[i] === comercio) {
            $scope.comercios.splice(i, 1);
          }
        }
      } else {
        $scope.comercio.$remove(function () {
          $location.path('comercios');
        });
      }
    };

    // Update existing Comercio
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'comercioForm');

        return false;
      }

      var comercio = $scope.comercio;

      comercio.$update(function () {
        $location.path('comercios/' + comercio._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Comercios
    $scope.find = function () {
      $scope.comercios = Comercios.query();
    };

    // Find existing Comercio
    $scope.findOne = function () {
      $scope.comercio = Comercios.get({
        comercioId: $stateParams.comercioId
      });
    };
  }
]);
