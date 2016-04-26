'use strict';

// Comercios controller
angular.module('comercios').controller('ComerciosController', ['$scope', '$stateParams', '$location', '$window', '$timeout', 'Authentication', 'Comercios', 'FileUploader', 'NgTableParams',
  function ($scope, $stateParams, $location, $window, $timeout, Authentication, Comercios, FileUploader, NgTableParams) {
    $scope.authentication = Authentication;
    $scope.UrlImageComercio = '';
    $scope.UrlImageLogo = '';
    $scope.preview = {
      UrlImageComercio: '',
      UrlImageLogo: ''
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
        ImagenesPromociones: this.ImagenesPromociones,
        Slogan: this.Slogan,
        Email: this.Email,
        Web: this.Web,
        Facebook: this.Facebook,
        Instagram: this.Instagram,
        Twitter: this.Twitter,
        EnvioADomicilio: this.EnvioADomicilio
        // Telefonos: this.Telefonos,
        // Tarjeta: this.Tarjeta
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
      var comercio = new Comercios({
        _id: $stateParams.IdComercio,
        NombreComercio: this.comercio.NombreComercio,
        UbicacionLat: this.comercio.UbicacionLat,
        UbicacionLon: this.comercio.UbicacionLon,
        UrlImageComercio: this.preview.UrlImageComercio,
        UrlImageLogo: this.preview.UrlImageLogo,
        ImagenesPromociones: this.comercio.ImagenesPromociones,
        Slogan: this.comercio.Slogan,
        Email: this.comercio.Email,
        Web: this.comercio.Web,
        Facebook: this.comercio.Facebook,
        Instagram: this.comercio.Instagram,
        Twitter: this.comercio.Twitter,
        EnvioADomicilio: this.comercio.EnvioADomicilio
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
      $scope.comercio = Comercios.get({
        IdComercio: $stateParams.IdComercio
      },function(){
        console.log($scope.comercio.Productos );
        $scope.tableParams = new NgTableParams({
          count:10,
          sorting: { NombreProducto: 'asc' }
        }, { data: $scope.comercio.Productos });
      });
      $scope.preview.UrlImageLogo = $scope.comercio.UrlImageLogo;
      $scope.preview.UrlImageComercio = $scope.comercio.UrlImageComercio;
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
            if($scope.comercio)
              $scope.comercio.UrlImageComercio = fileReaderEvent.target.result;  
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
            if($scope.comercio)
              $scope.comercio.UrlImageLogo = fileReaderEvent.target.result;  
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

  }
]);
