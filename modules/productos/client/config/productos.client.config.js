'use strict';

// Configuring the Productos module
angular.module('productos').run(['Menus',
  function (Menus) {
    // Add the productos dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Productos',
      state: 'productos',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'productos', {
      title: 'Listar Productos',
      state: 'productos.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'productos', {
      title: 'Create Productos',
      state: 'productos.create',
      roles: ['user']
    });
  }
]);
