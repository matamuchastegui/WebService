'use strict';

// Setting up route
angular.module('productos').config(['$stateProvider',
  function ($stateProvider) {
    // Productos state routing
    $stateProvider
      .state('productos', {
        abstract: true,
        url: '/productos',
        template: '<ui-view/>'
      })
      .state('productos.list', {
        url: '',
        templateUrl: 'modules/productos/client/views/list-productos.client.view.html'
      })
      .state('productos.create', {
        url: '/create',
        templateUrl: 'modules/productos/client/views/create-producto.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('productos.view', {
        url: '/:productoId',
        templateUrl: 'modules/productos/client/views/view-producto.client.view.html'
      })
      .state('productos.edit', {
        url: '/:productoId/edit',
        templateUrl: 'modules/productos/client/views/edit-producto.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      });
  }
]);
