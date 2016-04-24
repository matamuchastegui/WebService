'use strict';

// Setting up route
angular.module('comercios').config(['$stateProvider',
  function ($stateProvider) {
    // Comercios state routing
    $stateProvider
      .state('comercios', {
        abstract: true,
        url: '/comercios',
        template: '<ui-view/>'
      })
      .state('comercios.list', {
        url: '',
        templateUrl: 'modules/comercios/client/views/list-comercios.client.view.html'
      })
      .state('comercios.create', {
        url: '/create',
        templateUrl: 'modules/comercios/client/views/create-comercio.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('comercios.view', {
        url: '/:IdComercio',
        templateUrl: 'modules/comercios/client/views/view-comercio.client.view.html'
      })
      .state('comercios.edit', {
        url: '/:IdComercio/edit',
        templateUrl: 'modules/comercios/client/views/edit-comercio.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      });
  }
]);
