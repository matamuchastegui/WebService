'use strict';

// Cupones controller
angular.module('cupones').controller('CuponesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Cupones',
  function ($scope, $stateParams, $location, Authentication, Cupones) {
    $scope.authentication = Authentication;

    // Create new Cupon
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'CuponForm');

        return false;
      }

      // Create new Cupon object
      var Cupon = new Cupones({
        title: this.title,
        content: this.content
      });

      // Redirect after save
      Cupon.$save(function (response) {
        $location.path('cupones/' + response._id);

        // Clear form fields
        $scope.title = '';
        $scope.content = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing Cupon
    $scope.remove = function (Cupon) {
      if (Cupon) {
        Cupon.$remove();

        for (var i in $scope.cupones) {
          if ($scope.cupones[i] === Cupon) {
            $scope.cupones.splice(i, 1);
          }
        }
      } else {
        $scope.Cupon.$remove(function () {
          $location.path('cupones');
        });
      }
    };

    // Update existing Cupon
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'CuponForm');

        return false;
      }

      var Cupon = $scope.Cupon;

      Cupon.$update(function () {
        $location.path('cupones/' + Cupon._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Cupones
    $scope.find = function () {
      $scope.cupones = Cupones.query();
    };

    // Find existing Cupon
    $scope.findOne = function () {
      $scope.Cupon = Cupones.get({
        CuponId: $stateParams.CuponId
      });
    };
  }
]);
