'use strict';

// Configuring the Homes module
angular.module('homes').run(['Menus',
  function (Menus) {
    // Add the homes dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Home',
      state: 'homes',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'homes', {
      title: 'Ver Home',
      state: 'homes.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'homes', {
      title: 'Crear Home',
      state: 'homes.create',
      roles: ['user']
    });
  }
]);
