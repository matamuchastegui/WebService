'use strict';

// Configuring the Cupones module
angular.module('cupones').run(['Menus',
  function (Menus) {
    // Add the cupones dropdown item
    // Menus.addMenuItem('topbar', {
    //   title: 'Cupones',
    //   state: 'cupones',
    //   type: 'dropdown',
    //   roles: ['*']
    // });

    // // Add the dropdown list item
    // Menus.addSubMenuItem('topbar', 'cupones', {
    //   title: 'List Cupones',
    //   state: 'cupones.list'
    // });

    // // Add the dropdown create item
    // Menus.addSubMenuItem('topbar', 'cupones', {
    //   title: 'Create Cupones',
    //   state: 'cupones.create',
    //   roles: ['user']
    // });
  }
]);
