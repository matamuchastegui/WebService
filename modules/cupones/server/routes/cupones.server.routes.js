'use strict';

/**
 * Module dependencies.
 */
var cuponesPolicy = require('../policies/cupones.server.policy'),
  cupones = require('../controllers/cupones.server.controller');

module.exports = function (app) {
  // Cupones collection routes
  app.route('/api/cupones').all(cuponesPolicy.isAllowed)
    .get(cupones.list)
    .post(cupones.create);

  // Single Cupon routes
  app.route('/api/cupones/:CuponId')//.all(cuponesPolicy.isAllowed)
    .get(cupones.read)
    .put(cupones.update)
    .delete(cupones.delete);

  app.route('/api/registrarCupon').all(cuponesPolicy.isAllowed)
    .post(cupones.registrarCupon);

  app.route('/api/getAllCupons').all(cuponesPolicy.isAllowed)
    .get(cupones.getAllCupons);

  // Finish by binding the Cupon middleware
  app.param('CuponId', cupones.CuponByID);
};
   


   