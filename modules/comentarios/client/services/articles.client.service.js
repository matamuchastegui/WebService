'use strict';

//Comentarios service used for communicating with the comentarios REST endpoints
angular.module('comentarios').factory('Comentarios', ['$resource',
  function ($resource) {
    return $resource('api/comentarios/:comentarioId', {
      comentarioId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
