'use strict';

/**
 * @api {get} /cupones GET All Cupones
 * @apiName GetCupones
 * @apiGroup Cupones
 * @apiSampleRequest http://52.36.173.82/api/cupones
 * @apiSuccess {Object[]} Cupon Devuelve todos los cupones.
 */
/**
 * @api {get} /cupones/:id GET Cupon
 * @apiName GetCupon
 * @apiGroup Cupones
 * @apiSampleRequest http://52.36.173.82/api/cupones/573bcee3a9a7c45d2e03f19f
 * @apiParam {ObjectId} id Cupones unique ID.
 *
 * @apiSuccess {Object} Cupon Cupon.
 * @apiSuccess {String} Cupon.NombreCupon Nombre del cupón.
 * @apiSuccess {Date} Cupon.ValidFrom Fecha de validez del cupón.
 * @apiSuccess {Date} Cupon.ValidTo  Fecha de vencimiento del cupón.        
 * @apiSuccess {Date} Cupon.created Fecha de creación del cupón.
 * @apiSuccess {Number} Cupon.CuponBarcode Código de barras.
 * @apiSuccess {Date} Cupon.OfertaValidaDesde Fecha desde que es válida la oferta.
 * @apiSuccess {Date} Cupon.OfertaValidaHasta Fecha que termina la oferta.
 * @apiSuccess {Boolean} Cupon.Temporizada ?
 * @apiSuccess {String} Cupon.CuponStatus Estado del cupón.
 * @apiSuccess {String} Cupon.CuponType Tipo de cupón.
 * @apiSuccess {String} Cupon.Description Descripción del cupón.
 * @apiSuccess {String} Cupon.CuponUrl Url del cupón.
 * @apiSuccess {String} Cupon.UrlImage Imagen del cupón.
 * @apiSuccess {ObjectId} Cupon.Comercio Id del comercio.
 *
 * @apiError CuponNotFound El id de cupón no existe.
 *
 * @apiErrorExample Error-Response Not Found:
 *     HTTP/1.1 404 Not Found
 *     {
 *        "RespCode": 1,
 *        "RespMessage": "El cupón no existe"
 *     }
 *
 * @apiError CuponBadRequest El id de cupón tiene un formato incorrecto.
 *
 * @apiErrorExample Error-Response Bad Request:
 *     HTTP/1.1 400 Bad Request
 *     {
 *        "RespCode": 1,
 *        "RespMessage": "El cupon es inválido"
 *     }

 */
var cuponesPolicy = require('../policies/cupones.server.policy'),
  cupones = require('../controllers/cupones.server.controller');

module.exports = function (app) {
  // Cupones collection routes
  app.route('/api/cupones').all(cuponesPolicy.isAllowed)
    .get(cupones.list)
    .post(cupones.create);

  // Single Cupon routes
  app.route('/api/cupones/:cuponId')//.all(cuponesPolicy.isAllowed)
    .get(cupones.read)
    .put(cupones.update)
    .delete(cupones.delete);

  app.route('/api/registrarCupon').all(cuponesPolicy.isAllowed)
    .post(cupones.registrarCupon);

  app.route('/api/getAllCupons').all(cuponesPolicy.isAllowed)
    .get(cupones.getAllCupons);

  // Finish by binding the Cupon middleware
  app.param('cuponId', cupones.CuponByID);
};
   


   