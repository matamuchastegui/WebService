'use strict';

// Comercios controller
angular.module('comercios').controller('ComerciosController', ['$scope', '$stateParams', '$location', '$window', '$timeout', 'Authentication', 'Comercios', 'FileUploader',
  function ($scope, $stateParams, $location, $window, $timeout, Authentication, Comercios, FileUploader) {
    $scope.authentication = Authentication;
    $scope.UrlImageComercio = {
      name: '',
      url: ''
    };
    $scope.UrlImageLogo = {
      name: '',
      url: ''
    };
    $scope.preview = {
      UrlImageComercio: {
        name: '',
        url: ''
      },
      UrlImageLogo: {
        name: '',
        url: ''
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
        UrlImageComercio: this.preview.UrlImageComercio.url,
        UrlImageLogo: this.preview.UrlImageLogo.url,
        ImagenesPromociones: this.ImagenesPromociones,
        Slogan: this.Slogan,
        Email: this.Email,
        Web: this.Web,
        Facebook: this.Facebook,
        Instagram: this.Instagram,
        Twitter: this.Twitter,
        EnvioADomicilio: this.EnvioADomicilios
        // Telefonos: this.Telefonos,
        // Tarjeta: this.Tarjeta
      });
      console.log('comercio',comercio);
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
        console.log('up',fileItem,$scope.UrlImageComercio);
        console.log('queue',$scope.uploader.queue);
        fileReader.onload = function (fileReaderEvent) {
          console.log('fileReaderEvent',fileReaderEvent);
          $timeout(function () {
            $scope.UrlImageComercio.url = fileReaderEvent.target.result;
          }, 0);
        };
      }
    };

    $scope.uploader.onSuccessItem = function (fileItem, response, status, headers) {
      console.log('response',response);
      $scope.success = "La imagen del comercio se catgó correctamente";
      $scope.UrlImageComercio.url = '';
      $scope.preview.UrlImageComercio.url = response.url;
      $scope.uploader.clearQueue();
    };

    $scope.uploader.onErrorItem = function (fileItem, response, status, headers) {
      $scope.cancelUpload();
      $scope.error = response.message;
    };

    $scope.uploadProfilePicture = function () {
      console.log('uploadProfilePicture');
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
          console.log('fileReaderEvent',fileReaderEvent);
          $timeout(function () {
            $scope.UrlImageLogo.url = fileReaderEvent.target.result;
          }, 0);
        };
      }
    };

    $scope.uploaderLogo.onSuccessItem = function (fileItem, response, status, headers) {
      console.log('response',response);
      $scope.success = "La imagen del logo se catgó correctamente";
      $scope.UrlImageComercio.url = '';
      $scope.preview.UrlImageLogo.url = response.url;
      $scope.uploaderLogo.clearQueue();
    };

    $scope.uploaderLogo.onErrorItem = function (fileItem, response, status, headers) {
      $scope.cancelUploadLogo();
      $scope.error = response.message;
    };

    $scope.uploadLogo = function () {
      console.log('uploadProfilePicture');
      $scope.success = $scope.error = null;
      $scope.uploaderLogo.uploadAll();
    };

    $scope.cancelUploadLogo = function () {
      $scope.uploaderLogo.clearQueue();
    };

  }
]);
