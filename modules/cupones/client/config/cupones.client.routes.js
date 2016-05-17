'use strict';

// Setting up route
angular.module('cupones').config(['$stateProvider',
  function ($stateProvider) {
    
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
        templateUrl: 'modules/cupones/client/views/create-cupon.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('cupones.view', {
        url: '/:cuponId',
        templateUrl: 'modules/cupones/client/views/view-cupon.client.view.html'
      })
      .state('cupones.edit', {
        url: '/:cuponId/edit',
        templateUrl: 'modules/cupones/client/views/edit-cupon.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      });
  }
]);
