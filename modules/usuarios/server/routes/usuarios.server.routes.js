'use strict';

/**
 * Module dependencies.
 */
var usuariosPolicy = require('../policies/usuarios.server.policy'),
  usuarios = require('../controllers/usuarios.server.controller');

module.exports = function (app) {
  // Usuarios collection routes
  app.route('/api/usuarios').all(usuariosPolicy.isAllowed)
    .get(usuarios.list);

  app.route('/api/registrarusuario').all(usuariosPolicy.isAllowed)
    .post(usuarios.create);

  app.route('/api/login').all(usuariosPolicy.isAllowed)
    .post(usuarios.login);

  app.route('/api/recuperarcontrasenia').all(usuariosPolicy.isAllowed)
    .post(usuarios.recuperarcontrasenia);

  app.route('/api/editarperfil').all(usuariosPolicy.isAllowed)
    .post(usuarios.editarperfil);

  // Single usuario routes
  app.route('/api/usuarios/:usuarioId').all(usuariosPolicy.isAllowed)
    // .get(usuarios.read)
    // .put(usuarios.update)
    .delete(usuarios.delete);

  app.route('/api/getDetailCustomer').all(usuariosPolicy.isAllowed)
    .post(usuarios.getDetailCustomer);    

  // Finish by binding the usuario middleware
  app.param('usuarioId', usuarios.usuarioByID);
  app.param('IdUsuario', usuarios.usuarioByIdUsuario);
};
