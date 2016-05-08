'use strict';

// Comercios controller
angular.module('comercios').controller('ComerciosController', ['$scope', '$stateParams', '$location', '$window', '$timeout', '$interval', '$uibModal', 'Authentication', 'Comercios', 'FileUploader', 'NgTableParams',
  function ($scope, $stateParams, $location, $window, $timeout, $interval, $uibModal, Authentication, Comercios, FileUploader, NgTableParams) {
    $scope.authentication = Authentication;
    $scope.UrlImageComercio = '';
    $scope.UrlImageLogo = '';
    $scope.preview = {
      UrlImageComercio: '',
      UrlImageLogo: ''
    };
    $scope.ImagenesBanners = [];
    $scope.EnvioADomicilio = false;
    $scope.Tarjetas = [
      {
        NombreTarjeta: 'Visa',
        Acepta: false
      },
      {
        NombreTarjeta: 'MasterCard',
        Acepta: false
      },
      {
        NombreTarjeta: 'Naranja',
        Acepta: false
      }
    ];
    // $scope.data = {};
    $scope.LunesViernes = {
      Cortado: false,
      DM: new Date(0, 0, 0, 9, 0, 0, 0),
      DT: new Date(0, 0, 0, 9, 0, 0, 0),
      HM: new Date(0, 0, 0, 19, 0, 0, 0),
      HT: new Date(0, 0, 0, 19, 0, 0, 0)
    };

    $scope.Sabado = {
      Cortado: false,
      DM: new Date(0, 0, 0, 9, 0, 0, 0),
      DT: new Date(0, 0, 0, 9, 0, 0, 0),
      HM: new Date(0, 0, 0, 19, 0, 0, 0),
      HT: new Date(0, 0, 0, 19, 0, 0, 0)
    };

    $scope.DomingoFeriado = {
      Cortado: false,
      DM: new Date(0, 0, 0, 9, 0, 0, 0),
      DT: new Date(0, 0, 0, 9, 0, 0, 0),
      HM: new Date(0, 0, 0, 19, 0, 0, 0),
      HT: new Date(0, 0, 0, 19, 0, 0, 0)  
    };

    $scope.changeCheck = function(item){
      if(item.Cortado){
        item.DM = new Date(0, 0, 0, 9, 0, 0, 0);
        item.DT = new Date(0, 0, 0, 16, 0, 0, 0);
        item.HM = new Date(0, 0, 0, 13, 0, 0, 0);
        item.HT = new Date(0, 0, 0, 22, 0, 0, 0);
      }
      else{
        item.DM = new Date(0, 0, 0, 9, 0, 0, 0);
        item.DT = new Date(0, 0, 0, 9, 0, 0, 0);
        item.HM = new Date(0, 0, 0, 19, 0, 0, 0);
        item.HT = new Date(0, 0, 0, 19, 0, 0, 0);
      }
    };
    // Create new Comercio
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'comercioForm');

        return false;
      }

      // Create new Comercio object
      var comercio = new Comercios({
        // IdComercio: this.IdComercio,
        NombreComercio: this.NombreComercio,
        UbicacionLat: this.UbicacionLat,
        UbicacionLon: this.UbicacionLon,
        UrlImageComercio: this.preview.UrlImageComercio,
        UrlImageLogo: this.preview.UrlImageLogo,
        ImagenesBanners: this.ImagenesBanners,
        Slogan: this.Slogan,
        Email: this.Email,
        Web: this.Web,
        Facebook: this.Facebook,
        Instagram: this.Instagram,
        Twitter: this.Twitter,
        EnvioADomicilio: this.EnvioADomicilio,
        Horarios: {
          LunesViernes: this.LunesViernes,
          Sabado: this.Sabado,
          DomingoFeriado: this.DomingoFeriadoAbierto ? this.DomingoFeriado : null
        },
        Direccion: this.Direccion,
        Telefono: this.Telefono,
        Tarjetas: this.Tarjeta
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

        for (var i in $scope.data.Comercios) {
          if ($scope.data.Comercios[i] === comercio) {
            $scope.data.Comercios.splice(i, 1);
          }
        }
      } else {
        $scope.data.Comercio.$remove(function () {
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
      var comercio = new Comercios({
        _id: $stateParams.IdComercio,
        NombreComercio: this.data.Comercio.NombreComercio,
        UbicacionLat: this.data.Comercio.UbicacionLat,
        UbicacionLon: this.data.Comercio.UbicacionLon,
        UrlImageComercio: this.preview.UrlImageComercio,
        UrlImageLogo: this.preview.UrlImageLogo,
        ImagenesBanners: this.data.Comercio.ImagenesBanners,
        Slogan: this.data.Comercio.Slogan,
        Email: this.data.Comercio.Email,
        Web: this.data.Comercio.Web,
        Facebook: this.data.Comercio.Facebook,
        Instagram: this.data.Comercio.Instagram,
        Twitter: this.data.Comercio.Twitter,
        EnvioADomicilio: this.data.Comercio.EnvioADomicilio,
        Horarios: {
          LunesViernes: this.data.Comercio.LunesViernes,
          Sabado: this.data.Comercio.Sabado,
          DomingoFeriado: this.data.Comercio.DomingoFeriadoAbierto ? this.data.Comercio.DomingoFeriado : null
        },
        Direccion: this.data.Comercio.Direccion,
        Telefono: this.data.Comercio.Telefono,
        Tarjetas: this.data.Comercio.Tarjeta
      });
      comercio.$update(function (response) {        
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
      $scope.data = Comercios.get({
        IdComercio: $stateParams.IdComercio
      },function(){
        $scope.preview.UrlImageLogo = $scope.data.Comercio.UrlImageLogo;
        $scope.preview.UrlImageComercio = $scope.data.Comercio.UrlImageComercio;
        $scope.tableParams = new NgTableParams({
          count:10,
          sorting: { NombreProducto: 'asc' }
        }, { data: $scope.data.Comercio.Productos });
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

    $scope.uploader = new FileUploader({
      url: 'api/comercios/upload'
    });

    $scope.uploader.filters.push({
      name: 'imageFilter',
      fn: function (item, options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
    });

    $scope.uploader.onAfterAddingFile = function (fileItem) {
      if ($window.FileReader) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(fileItem._file);                
        fileReader.onload = function (fileReaderEvent) {          
          $timeout(function () {
            if($scope.data && $scope.data.Comercio)
              $scope.data.Comercio.UrlImageComercio = fileReaderEvent.target.result;  
            else
              $scope.UrlImageComercio = fileReaderEvent.target.result;
            
          }, 0);
        };
      }
    };

    $scope.uploader.onSuccessItem = function (fileItem, response, status, headers) {      
      $scope.success = "La imagen del comercio se cargó correctamente";
      $scope.UrlImageComercio = '';
      $scope.preview.UrlImageComercio = response.url;
      $scope.uploader.clearQueue();
    };

    $scope.uploader.onErrorItem = function (fileItem, response, status, headers) {
      $scope.cancelUpload();
      $scope.error = response.message;
    };

    $scope.uploadProfilePicture = function () {      
      $scope.success = $scope.error = null;
      $scope.uploader.uploadAll();
    };

    $scope.cancelUpload = function () {
      $scope.uploader.clearQueue();
    };

    $scope.uploaderLogo = new FileUploader({
      url: 'api/comercios/upload'
    });

    $scope.uploaderLogo.filters.push({
      name: 'imageFilter',
      fn: function (item, options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
    });

    $scope.uploaderLogo.onAfterAddingFile = function (fileItem) {
      if ($window.FileReader) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(fileItem._file);
        fileReader.onload = function (fileReaderEvent) {          
          $timeout(function () {
            if($scope.data && $scope.data.Comercio)
              $scope.data.Comercio.UrlImageLogo = fileReaderEvent.target.result;  
            else
              $scope.UrlImageLogo = fileReaderEvent.target.result;
          }, 0);
        };
      }
    };

    $scope.uploaderLogo.onSuccessItem = function (fileItem, response, status, headers) {      
      $scope.success = "La imagen del logo se cargó correctamente";
      $scope.UrlImageComercio = '';
      $scope.preview.UrlImageLogo = response.url;
      $scope.uploaderLogo.clearQueue();
    };

    $scope.uploaderLogo.onErrorItem = function (fileItem, response, status, headers) {
      $scope.cancelUploadLogo();
      $scope.error = response.message;
    };

    $scope.uploadLogo = function () {      
      $scope.success = $scope.error = null;
      $scope.uploaderLogo.uploadAll();
    };

    $scope.cancelUploadLogo = function () {
      $scope.uploaderLogo.clearQueue();
    };

    var banners = $scope.banners = new FileUploader({
      url: '/api/comercios/upload'
    });

    banners.filters.push({
      name: 'customFilter',
      fn: function(item, options) {
        return this.queue.length < 10;
      }
    });

    banners.onWhenAddingFileFailed = function(item, filter, options) {
      console.info('onWhenAddingFileFailed', item, filter, options);
    };

    banners.onErrorItem = function(fileItem, response, status, headers) {
      console.info('onErrorItem', fileItem, response, status, headers);
    };

    banners.onAfterAddingAll = function(files) {
      banners.uploadAll();
      var stop;
      if (angular.isDefined(stop)) return;
      stop = $interval(function() {
        if ($scope.banners.queue.length > 0) {
          $interval.cancel(stop);
          $scope.modalProgress();
        }
      }, 100);

    };

    banners.onCompleteAll = function() {
      $scope.banners.queue.ready = true;
    };

    banners.onCompleteItem = function(fileItem, response, status, headers) {
      if (status > 0) {
        var file = fileItem._file.name.replace(/"/g, '');
        $scope.ImagenesBanners.push(response.url);
      }
    };

  }
]);
