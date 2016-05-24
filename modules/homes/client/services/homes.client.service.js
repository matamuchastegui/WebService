'use strict';

//Homes service used for communicating with the homes REST endpoints
angular.module('homes').factory('Homes', ['$resource',
  function ($resource) {
    return $resource('api/homes/:homeId', {
      homeId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
