'use strict';

// Setting up route
angular.module('homes').config(['$stateProvider',
  function ($stateProvider) {
    // Homes state routing
    $stateProvider
      .state('homes', {
        abstract: true,
        url: '/homes',
        template: '<ui-view/>'
      })
      .state('homes.list', {
        url: '',
        templateUrl: 'modules/homes/client/views/list-homes.client.view.html'
      })
      .state('homes.create', {
        url: '/create',
        templateUrl: 'modules/homes/client/views/create-home.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('homes.view', {
        url: '/:homeId',
        templateUrl: 'modules/homes/client/views/view-home.client.view.html'
      })
      .state('homes.edit', {
        url: '/:homeId/edit',
        templateUrl: 'modules/homes/client/views/edit-home.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      });
  }
]);
