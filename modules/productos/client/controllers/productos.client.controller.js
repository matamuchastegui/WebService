'use strict';

// Productos controller
angular.module('productos').controller('ProductosController', ['$scope', '$stateParams', '$location', 'Authentication', 'Productos',
  function ($scope, $stateParams, $location, Authentication, Productos) {
    $scope.authentication = Authentication;
    $scope.OfertaValidaDesde = new Date();
    $scope.OfertaValidaHasta = new Date().getTime() + 259200000;

    $scope.open = function($event) {
      $scope.opened = true;
    };

    $scope.openH = function($event) {
      $scope.openedH = true;
    };
    // Create new Producto
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'productoForm');

        return false;
      }

      // Create new Producto object
      var producto = new Productos({
        NombreProducto: this.NombreProducto,
        Descripcion: this.Descripcion,
        UrlPreviewPpal: this.UrlPreviewPpal,
        ImagenGaleria: this.ImagenGaleria,
        PrecioLista: this.PrecioLista,
        Oferta: this.Oferta,
        Temporizada: this.Temporizada,
        OfertaValidaHasta: this.OfertaValidaHasta,
        OfertaValidaDesde: this.OfertaValidaDesde,
        PrecioOferta: this.PrecioOferta
      });

      // Redirect after save
      producto.$save(function (response) {
        $location.path('productos/' + response._id);

        // Clear form fields
        $scope.title = '';
        $scope.content = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing Producto
    $scope.remove = function (producto) {
      if (producto) {
        producto.$remove();

        for (var i in $scope.productos) {
          if ($scope.productos[i] === producto) {
            $scope.productos.splice(i, 1);
          }
        }
      } else {
        $scope.producto.$remove(function () {
          $location.path('productos');
        });
      }
    };

    // Update existing Producto
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'productoForm');

        return false;
      }

      var producto = $scope.producto;

      producto.$update(function () {
        $location.path('productos/' + producto._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Productos
    $scope.find = function () {
      $scope.productos = Productos.query();
    };

    // Find existing Producto
    $scope.findOne = function () {
      $scope.producto = Productos.get({
        productoId: $stateParams.productoId
      });
    };
  }
]);
