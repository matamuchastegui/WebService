'use strict';

// Setting up route
angular.module('cupones').config(['$stateProvider',
  function ($stateProvider) {
    // Cupones state routing
    $stateProvider
      .state('cupones', {
        abstract: true,
        url: '/cupones',
        template: '<ui-view/>'
      })
      .state('cupones.list', {
        url: '',
        templateUrl: 'modules/cupones/client/views/list-cupones.client.view.html'
      })
      .state('cupones.create', {
        url: '/create',
        templateUrl: 'modules/cupones/client/views/create-Cupon.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('cupones.view', {
        url: '/:CuponId',
        templateUrl: 'modules/cupones/client/views/view-Cupon.client.view.html'
      })
      .state('cupones.edit', {
        url: '/:CuponId/edit',
        templateUrl: 'modules/cupones/client/views/edit-Cupon.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      });
  }
]);
