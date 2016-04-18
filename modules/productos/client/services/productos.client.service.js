'use strict';

//Productos service used for communicating with the productos REST endpoints
angular.module('productos').factory('Productos', ['$resource',
  function ($resource) {
    return $resource('api/productos/:productoId', {
      productoId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
