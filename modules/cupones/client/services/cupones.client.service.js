'use strict';

//Cupones service used for communicating with the cupones REST endpoints
angular.module('cupones').factory('Cupones', ['$resource',
  function ($resource) {
    return $resource('api/cupones/:CuponId', {
      CuponId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
