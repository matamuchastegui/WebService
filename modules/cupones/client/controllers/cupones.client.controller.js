'use strict';

// Cupones controller
angular.module('cupones').controller('CuponesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Cupones', 'Comercios',
  function ($scope, $stateParams, $location, Authentication, Cupones, Comercios) {
    $scope.authentication = Authentication;
    $scope.ValidFrom = new Date();
    $scope.ValidTo = new Date().getTime() + 259200000;

    $scope.open = function($event) {
      $scope.opened = true;
    };

    $scope.openH = function($event) {
      $scope.openedH = true;
    };

    $scope.findComercios = function (){
      $scope.comercios = Comercios.query(function(data){
        $scope.comercio = $scope.comercios[0]._id;
      });
    };

    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'CuponForm');
        return false;
      }

      var cupon = new Cupones({
        NombreCupon: this.NombreCupon, 
        CuponBarcode: this.CuponBarcode, 
        ValidFrom: this.ValidFrom, 
        ValidTo: this.ValidTo, 
        Description: this.Description, 
        CuponType: this.CuponType, 
        CuponStatus: this.CuponStatus, 
        CuponUrl: this.CuponUrl, 
        CuponUsado: this.CuponUsado, 
        UrlImage: this.UrlImage, 
        Comercio: this.comercio
      });

      // Redirect after save
      cupon.$save(function (response) {
        console.log('respo',response);
        new Comercios.get({
          IdComercio: $scope.comercio,
          bo: true
        },function(data){
          console.log('dataC',data,'resid',response._id);
          cupon = new Cupones.get({
            cuponId: response._id,
            bo: true
          },function(dataq){
            console.log('dataq',dataq);
            if(data.Cupones)
              data.Cupones.push(response);
            else
              data.Cupones = cupon;
            console.log('dataupdate',data);
            data.$update(function (comercioResponse) {
              console.log('comercioResponse',comercioResponse);
              $location.path('cupones/' + response._id);
            }, function (errorResponse) {
              console.log('erq',errorResponse);
              $scope.error = errorResponse.data.message;
            });
          });
        });
      }, function (errorResponse) {
        console.log('err',errorResponse);
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing Cupon
    $scope.remove = function (cupon) {
      if (cupon) {
        cupon.$remove();

        for (var i in $scope.cupones) {
          if ($scope.cupones[i] === cupon) {
            $scope.cupones.splice(i, 1);
          }
        }
      } else {
        $scope.cupon.$remove(function () {
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

      var cupon = $scope.cupon;

      cupon.$update(function () {
        $location.path('cupones/' + cupon._id);
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
      $scope.cupon = Cupones.get({
        cuponId: $stateParams.cuponId
      });
    };
  }
]);
