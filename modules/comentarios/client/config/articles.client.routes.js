'use strict';

// Setting up route
angular.module('comentarios').config(['$stateProvider',
  function ($stateProvider) {
    // Comentarios state routing
    $stateProvider
      .state('comentarios', {
        abstract: true,
        url: '/comentarios',
        template: '<ui-view/>'
      })
      .state('comentarios.list', {
        url: '',
        templateUrl: 'modules/comentarios/client/views/list-comentarios.client.view.html'
      })
      .state('comentarios.create', {
        url: '/create',
        templateUrl: 'modules/comentarios/client/views/create-comentario.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('comentarios.view', {
        url: '/:comentarioId',
        templateUrl: 'modules/comentarios/client/views/view-comentario.client.view.html'
      })
      .state('comentarios.edit', {
        url: '/:comentarioId/edit',
        templateUrl: 'modules/comentarios/client/views/edit-comentario.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      });
  }
]);
