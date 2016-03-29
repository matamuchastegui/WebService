'use strict';

// Configuring the Comentarios module
angular.module('comentarios').run(['Menus',
  function (Menus) {
    // Add the comentarios dropdown item
    // Menus.addMenuItem('topbar', {
    //   title: 'Comentarios',
    //   state: 'comentarios',
    //   type: 'dropdown',
    //   roles: ['*']
    // });

    // // Add the dropdown list item
    // Menus.addSubMenuItem('topbar', 'comentarios', {
    //   title: 'List Comentarios',
    //   state: 'comentarios.list'
    // });

    // // Add the dropdown create item
    // Menus.addSubMenuItem('topbar', 'comentarios', {
    //   title: 'Create Comentarios',
    //   state: 'comentarios.create',
    //   roles: ['user']
    // });
  }
]);
