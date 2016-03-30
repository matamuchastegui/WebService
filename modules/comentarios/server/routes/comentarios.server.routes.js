'use strict';

/**
 * Module dependencies.
 */
var comentariosPolicy = require('../policies/comentarios.server.policy'),
  comentarios = require('../controllers/comentarios.server.controller');

module.exports = function (app) {
  // Comentarios collection routes
  app.route('/api/comentarios').all(comentariosPolicy.isAllowed)
    .get(comentarios.list)
    .post(comentarios.create);

  // Single comentario routes
  app.route('/api/comentarios/:comentarioId')//.all(comentariosPolicy.isAllowed)
    .get(comentarios.read)
    .put(comentarios.update)
    .delete(comentarios.delete);

  app.route('/api/getComentarios').all(comentariosPolicy.isAllowed)
    .post(comentarios.getComentarios);


  // Finish by binding the comentario middleware
  app.param('TypeComent', comentarios.typeComent);
  app.param('IdEntity', comentarios.comentarioByID);
};
   


   