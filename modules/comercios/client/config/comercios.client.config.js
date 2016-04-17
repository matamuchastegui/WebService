'use strict';

// Configuring the Comercios module
angular.module('comercios').run(['Menus',
  function (Menus) {
    // Add the comercios dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Comercios',
      state: 'comercios',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'comercios', {
      title: 'Listar Comercios',
      state: 'comercios.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'comercios', {
      title: 'Crear Comercios',
      state: 'comercios.create'
    });
  }
]);
