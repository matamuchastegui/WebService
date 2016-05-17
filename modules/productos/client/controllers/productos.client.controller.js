'use strict';

// Productos controller
angular.module('productos').controller('ProductosController', ['$scope', '$stateParams', '$location', '$interval', '$uibModal', 'Authentication', 'Productos', 'Comercios', 'FileUploader', 'NgTableParams',
  function ($scope, $stateParams, $location, $interval, $uibModal, Authentication, Productos, Comercios, FileUploader, NgTableParams) {    
    $scope.authentication = Authentication;
    $scope.OfertaValidaDesde = new Date();
    $scope.OfertaValidaHasta = new Date().getTime() + 259200000;
    $scope.ImagenGaleria = [];

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

      var imagenes = [];
      for (var i = this.ImagenGaleria.length - 1; i >= 0; i--) {
        imagenes.push(this.ImagenGaleria[i].url);
      }

      if(!this.UrlPreviewPpal && this.ImagenGaleria.length > 0)
        this.UrlPreviewPpal = this.ImagenGaleria[0].url;

      // Create new Producto object
      var producto = new Productos({
        NombreProducto: this.NombreProducto,
        Descripcion: this.Descripcion,
        UrlPreviewPpal: this.UrlPreviewPpal,
        ImagenGaleria: imagenes,
        PrecioLista: this.PrecioLista,
        Oferta: this.Oferta,
        Temporizada: this.Temporizada,
        OfertaValidaHasta: this.OfertaValidaHasta,
        OfertaValidaDesde: this.OfertaValidaDesde,
        PrecioOferta: this.PrecioOferta
      });

      // Redirect after save
      producto.$save(function (response) {
        new Comercios.get({
          IdComercio: $scope.comercio,
          bo: true
        },1,function(data){
          producto = new Productos.get({
            productoId: response._id,
            bo: true
          },function(){
            if(data.Productos)
              data.Productos.push(response);
            else
              data.Productos = producto;
            data.$update(function () {
              $location.path('productos/' + response._id);
            }, function (errorResponse) {
              $scope.error = errorResponse.data.message;
            });
          });
        });
        
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

    $scope.ppal = function (item, index) {
      $scope.UrlPreviewPpal = item;
      for (var i = $scope.ImagenGaleria.length - 1; i >= 0; i--) {
        $scope.ImagenGaleria[i].ppal = i === index;
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

    $scope.findComercios = function (){
      $scope.comercios = Comercios.query(function(){
        $scope.comercio = $scope.comercios[0]._id;
      });
    };
    // Find a list of Productos
    $scope.find = function () {
      $scope.productos = Productos.query(function(){
        $scope.tableParams = new NgTableParams({
          count:10,
          sorting: { name: 'asc' }
        }, { data: $scope.productos });
      });
    };

    // Find existing Producto
    $scope.findOne = function () {
      $scope.producto = Productos.get({
        productoId: $stateParams.productoId,
        bo: true
      },function(){
        console.log('prod',$scope.producto);
      });
    };
    var modalInstance;
    $scope.modalProgress = function() {
      modalInstance = $uibModal.open({
        animation: true,
        templateUrl: '/modules/core/client/views/templates/modal-progress.client.view.html',
        controller: 'ModalProgressController',
        scope: $scope
      });
    };

    var uploader = $scope.uploader = new FileUploader({
      url: '/api/comercios/upload'
    });

    uploader.filters.push({
      name: 'customFilter',
      fn: function(item, options) {
        return this.queue.length < 10;
      }
    });

    uploader.onWhenAddingFileFailed = function(item, filter, options) {
      console.info('onWhenAddingFileFailed', item, filter, options);
    };

    uploader.onErrorItem = function(fileItem, response, status, headers) {
      console.info('onErrorItem', fileItem, response, status, headers);
    };

    uploader.onAfterAddingAll = function(files) {
      uploader.uploadAll();
      var stop;
      if (angular.isDefined(stop)) return;
      stop = $interval(function() {
        if ($scope.uploader.queue.length > 0) {
          $interval.cancel(stop);
          $scope.modalProgress();
        }
      }, 100);

    };

    uploader.onCompleteAll = function() {
      $scope.uploader.queue.ready = true;
    };

    uploader.onCompleteItem = function(fileItem, response, status, headers) {
      if (status > 0) {
        var file = fileItem._file.name.replace(/"/g, '');
        $scope.ImagenGaleria.push({name:file,url:response.url,ppal:$scope.uploader.queue.length === 1});
      }
    };

    $scope.remove = function(fileItem, index) {
      $scope.Archivos.name.splice(index, 1);
      $scope.uploader.queue[index].remove();
    };
  }

  
]);
