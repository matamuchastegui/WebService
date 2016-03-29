'use strict';

/**
 * Module dependencies.
 */
var comerciosPolicy = require('../policies/comercios.server.policy'),
  comercios = require('../controllers/comercios.server.controller');

module.exports = function (app) {
  // Comercios collection routes
  app.route('/api/comercios').all(comerciosPolicy.isAllowed)
    .get(comercios.list)
    .post(comercios.create);

  // Single comercio routes
  app.route('/api/comercios/:comercioId')//.all(comerciosPolicy.isAllowed)
    .get(comercios.read)
    .put(comercios.update)
    .delete(comercios.delete);

  app.route('/api/agendarComercio').all(comerciosPolicy.isAllowed)
    .post(comercios.agendarComercio);
  
  app.route('/api/getAllComercios').all(comerciosPolicy.isAllowed)
    .get(comercios.getAllComercios);
  
  app.route('/api/setlikecomercio').all(comerciosPolicy.isAllowed)
    .post(comercios.setlikecomercio);
  
  app.route('/api/getComercio').all(comerciosPolicy.isAllowed)
    .get(comercios.getComercio);
  
  app.route('/api/getLastComerciosAdheridos').all(comerciosPolicy.isAllowed)
    .get(comercios.getLastComerciosAdheridos);

  app.route('/api/getProductosPorComercio/:IdComercio').all(comerciosPolicy.isAllowed)
    .get(comercios.getProductosPorComercio);

  // Finish by binding the comercio middleware
  app.param('IdComercio', comercios.comercioByID);
};
   


   