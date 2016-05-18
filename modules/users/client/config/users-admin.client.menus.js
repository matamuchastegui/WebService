'use strict';

// Configuring the Articles module
angular.module('users.admin').run(['Menus',
  function (Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Administrar Usuarios',
      state: 'admin.users'
    });

    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Documentación API',
      state: 'documentation'
    });

  }
]);
