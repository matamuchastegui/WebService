'use strict';

// Homes controller
angular.module('homes').controller('HomesController', ['$scope', '$stateParams', '$location', '$interval', '$uibModal', 'Authentication', 'Homes', 'Comercios', 'FileUploader', 'NgTableParams',
  function ($scope, $stateParams, $location, $interval, $uibModal, Authentication, Homes, Comercios, FileUploader, NgTableParams) {    
    $scope.authentication = Authentication;
    $scope.Favoritos = [];
    $scope.Banners = [];
    $scope.OfertasDestacadas = [];
    var iFav = -1;

    $scope.addFav = function() {
      iFav++;
      $scope.Favoritos.push({
        Label: '',
        Items: []
      });
    };

    // Create new Home
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'homeForm');
        return false;
      }
      console.log('$scope.Favoritos',$scope.Favoritos);
      console.log('$scope.Banners',$scope.Banners);
      console.log('$scope.OfertasDestacadas',$scope.OfertasDestacadas);
      // var imagenes = [];
      // for (var i = this.ImagenGaleria.length - 1; i >= 0; i--) {
      //   imagenes.push(this.ImagenGaleria[i].url);
      // }

      // Create new Home object
      var home = new Homes({
        Favoritos: this.Favoritos,
        Banners: this.Banners,
        OfertasDestacadas: this.OfertasDestacadas
      });

      // Redirect after save
      home.$save(function (response) {
          $location.path('homes/' + response._id);
        }, function (errorResponse) {
          $scope.error = errorResponse.data.message;
        });
    };

    // Remove existing Home
    $scope.remove = function (home) {
      if (home) {
        home.$remove();

        for (var i in $scope.homes) {
          if ($scope.homes[i] === home) {
            $scope.homes.splice(i, 1);
          }
        }
      } else {
        $scope.home.$remove(function () {
          $location.path('homes');
        });
      }
    };

    // Update existing Home
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'homeForm');

        return false;
      }

      var home = $scope.home;

      home.$update(function () {
        $location.path('homes/' + home._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Homes
    $scope.find = function () {
      $scope.homes = Homes.query(function(){
        $scope.tableParams = new NgTableParams({
          count:10,
          sorting: { name: 'asc' }
        }, { data: $scope.homes });
      });
    };

    // Find existing Home
    $scope.findOne = function () {
      $scope.home = Homes.get({
        homeId: $stateParams.homeId,
        bo: true
      },function(){
        console.log('prod',$scope.home);
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
        }
      }, 100);

    };

    uploader.onCompleteAll = function() {
      $scope.uploader.queue.ready = true;
    };

    uploader.onCompleteItem = function(fileItem, response, status, headers) {
      if (status > 0) {
        var file = fileItem._file.name.replace(/"/g, '');
        $scope.Banners.push({Image:response.url,Url: ''});
      }
    };

    var ofertas = $scope.ofertas = new FileUploader({
      url: '/api/comercios/upload'
    });

    ofertas.filters.push({
      name: 'customFilter',
      fn: function(item, options) {
        return this.queue.length < 10;
      }
    });

    ofertas.onWhenAddingFileFailed = function(item, filter, options) {
      console.info('onWhenAddingFileFailed', item, filter, options);
    };

    ofertas.onErrorItem = function(fileItem, response, status, headers) {
      console.info('onErrorItem', fileItem, response, status, headers);
    };

    ofertas.onAfterAddingAll = function(files) {
      ofertas.uploadAll();
      var stop;
      if (angular.isDefined(stop)) return;
      stop = $interval(function() {
        if ($scope.ofertas.queue.length > 0) {
          $interval.cancel(stop);
        }
      }, 100);

    };

    ofertas.onCompleteAll = function() {
      $scope.uploader.queue.ready = true;
    };

    ofertas.onCompleteItem = function(fileItem, response, status, headers) {
      if (status > 0) {
        var file = fileItem._file.name.replace(/"/g, '');
        $scope.OfertasDestacadas.push({Image:response.url,Url: ''});
      }
    };

    var favoritos = $scope.favoritos = new FileUploader({
      url: '/api/comercios/upload'
    });

    favoritos.filters.push({
      name: 'customFilter',
      fn: function(item, options) {
        return this.queue.length < 10;
      }
    });

    favoritos.onWhenAddingFileFailed = function(item, filter, options) {
      console.info('onWhenAddingFileFailed', item, filter, options);
    };

    favoritos.onErrorItem = function(fileItem, response, status, headers) {
      console.info('onErrorItem', fileItem, response, status, headers);
    };

    favoritos.onAfterAddingAll = function(files) {
      favoritos.uploadAll();
      var stop;
      if (angular.isDefined(stop)) return;
      stop = $interval(function() {
        if ($scope.favoritos.queue.length > 0) {
          $interval.cancel(stop);
        }
      }, 100);

    };

    favoritos.onCompleteAll = function() {
      $scope.uploader.queue.ready = true;
    };

    favoritos.onCompleteItem = function(fileItem, response, status, headers) {
      if (status > 0) {
        var file = fileItem._file.name.replace(/"/g, '');
        $scope.Favoritos[iFav].Items.push({Image:response.url,Precio: 0});
      }
    };

    $scope.removeBanner = function(index) {
      console.log('index',index);
      $scope.Banners.splice(index,1); 
      $scope.uploader.queue[index].remove();
    };

    $scope.removeOfertas = function(index) {
      $scope.OfertasDestacadas.splice(index,1);
      $scope.ofertas.queue[index].remove();
    };

    $scope.removeFav = function(index) {
      console.log('index',index,iFav);
      console.log('fav',$scope.Favoritos[iFav]);

      $scope.Favoritos[iFav].Items.splice(index,1);
      $scope.favoritos.queue[index].remove();
    };

  }

  
]);
