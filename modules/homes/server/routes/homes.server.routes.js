'use strict';

/**
 * @api {POST} /getCabeceras POST Cabeceras
 * @apiName GetCabeceras
 * @apiGroup Comercios
 * @apiSampleRequest http://52.36.173.82/api/getCabeceras
 *
 * @apiParam {String} RegXPag Cantidad de registros por página.
 * @apiParam {String} Pag Número de página.
 *
 * @apiSuccess {Object[]} Cabeceras Devuelve principales datos de comercios.
 * @apiSuccess {String} UltimosAdheridos.Image Logo del comercio.
 * @apiSuccess {String} UltimosAdheridos.Slogan Slogan del comercio.
 * @apiSuccess {Number} UltimosAdheridos.PuntuacionEstrellas Puntuación del comercio.
 * @apiSuccess {ObjectId} UltimosAdheridos._id Id del comercio.
 *
 */
var homesPolicy = require('../policies/homes.server.policy'),
  homes = require('../controllers/homes.server.controller');

module.exports = function (app) {
  // Homes collection routes
  app.route('/api/homes').all(homesPolicy.isAllowed)
    .get(homes.list)
    .post(homes.create);

  app.route('/api/getHome')//.all(homesPolicy.isAllowed)
    .get(homes.getHome);

  app.route('/api/getCabeceras')//.all(homesPolicy.isAllowed)
    .post(homes.getCabeceras);
  
  app.route('/api/homes/:homeId')//.all(homesPolicy.isAllowed)
    .get(homes.read)
    .put(homes.update)
    .delete(homes.delete);

  // Finish by binding the home middleware
  app.param('homeId', homes.homeByID);
};
