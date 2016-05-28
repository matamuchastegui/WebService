'use strict';

// Homes controller
angular.module('homes').controller('HomesController', ['$scope', '$stateParams', '$location', '$interval', '$uibModal', '$anchorScroll', 'Authentication', 'Homes', 'FileUploader', '$document',
  function ($scope, $stateParams, $location, $interval, $uibModal, $anchorScroll, Authentication, Homes, FileUploader, $document) {    
    $scope.authentication = Authentication;
    $scope.Favoritos = [];
    $scope.Banners = [];
    $scope.OfertasDestacadas = [];

    $scope.myImage='';
    $scope.myCroppedImage='';
    var handleFileSelect=function(evt) {
      var file=evt.currentTarget.files[0];
      var reader = new FileReader();
      reader.onload = function (evt) {
        $scope.$apply(function($scope){
          $scope.myImage=evt.target.result;
        });
      };
      reader.readAsDataURL(file);
    };
    angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);

    var iFav = -1;

    $scope.addFav = function(edit) {
      if(edit){
        iFav = $scope.home.Favoritos.length;
        $scope.home.Favoritos.push({
          Label: '',
          Items: []
        });
      }
      else{
        iFav = $scope.Favoritos.length;
        $scope.Favoritos.push({
          Label: '',
          Items: []
        });
      }
    };

    $scope.addFavImage = function (index){
      iFav = index;
      angular.element($document[0].querySelector('#cargarFav').click());
      // angular.element('#cargarFav').click();
      // $anchorScroll();
    };
    // Create new Home
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'homeForm');
        return false;
      }

      var home = new Homes({
        Favoritos: this.Favoritos,
        Banners: this.Banners,
        OfertasDestacadas: this.OfertasDestacadas
      });

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

    $scope.activate = function (){
      Homes.query({RegXPag:1}, function(response){
        $scope.home.Orden = response[0].Orden + 1;
        $scope.update(true,true);
      });
    };

    $scope.isActive = function (){
      Homes.query({RegXPag:1}, function(response){
        if($scope.home._id === response[0]._id)
          $scope.activo = true;
        else 
          $scope.activo = false;
      });
    };

    // Update existing Home
    $scope.update = function (isValid,activate) {
      console.log('update');
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'homeForm');

        return false;
      }

      var home = $scope.home;
      console.log('hom',home);
      home.$update(function (response) {
        console.log('re',response);
        if(activate)
          $scope.activo = true;
        else
          $location.path('homes/' + home._id);
      }, function (errorResponse) {
        console.log('err',errorResponse);
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Homes
    $scope.find = function () {
      $scope.homes = Homes.query();
    };

    // Find existing Home
    $scope.findOne = function () {
      $scope.home = Homes.get({
        homeId: $stateParams.homeId,
        bo: true
      },function(response){
        iFav = $scope.home.Favoritos.length - 1;
        console.log('prod',$scope.home);
      });
    };

    var uploader = $scope.uploader = new FileUploader({
      url: '/api/files/upload'
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
      console.log('banneradd',$scope.Banners);
      if (status > 0) {
        console.log('stat',response.url);
        var file = fileItem._file.name.replace(/"/g, '');
        if($scope.home)
          $scope.home.Banners.push({Image:response.url,Url: ''});
        else
          $scope.Banners.push({Image:response.url,Url: ''});
      }
    };

    var ofertas = $scope.ofertas = new FileUploader({
      url: '/api/files/upload'
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
        if($scope.home)
          $scope.home.OfertasDestacadas.push({Image:response.url,Url: ''});
        else
          $scope.OfertasDestacadas.push({Image:response.url,Url: ''});
      }
    };

    var favoritos = $scope.favoritos = new FileUploader({
      url: '/api/files/upload'
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
        console.log('ifav',iFav);
        var file = fileItem._file.name.replace(/"/g, '');
        if($scope.home)
          $scope.home.Favoritos[iFav].Items.push({Image:response.url,Precio: 0});
        else
          $scope.Favoritos[iFav].Items.push({Image:response.url,Precio: 0});
      }
    };

    $scope.removeBanner = function(iFav,index,edit) {
      if(edit)
        $scope.home.Banners.splice(index,1); 
      else{
        $scope.Banners.splice(index,1); 
        $scope.uploader.queue[index].remove();
      }
    };

    $scope.removeOfertas = function(iFav,index,edit) {
      if(edit)
        $scope.home.OfertasDestacadas.splice(index,1);
      else{
        $scope.OfertasDestacadas.splice(index,1);
        $scope.ofertas.queue[index].remove();
      }
    };

    $scope.removeFav = function(iFav,index,edit) {
      console.log('index',index,iFav);
      console.log('fav',$scope.favoritos.queue);
      if(edit)
        $scope.home.Favoritos[iFav].Items.splice(index,1);
      else{
        $scope.Favoritos[iFav].Items.splice(index,1);
        $scope.favoritos.queue[index].remove();
      }
      
    };

  }

  
]);
