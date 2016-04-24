'use strict';

//Comercios service used for communicating with the comercios REST endpoints
angular.module('comercios').factory('Comercios', ['$resource',
  function ($resource) {
    return $resource('api/comercios/:IdComercio', {
      IdComercio: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
