'use strict';

/**
 * @api {get} /getHome GET Pantalla principal
 * @apiName GetHome
 * @apiGroup Home
 * @apiSampleRequest http://52.36.173.82/api/getHome
 * @apiSuccess {Object[]} Banners Devuelve los banners de portada.
 * @apiSuccess {String} Banners.Image Url de la imagen.
 * @apiSuccess {String} Banners.Url Url que linkea la imagen.
 * @apiSuccess {Object[]} UltimosAdheridos Devuelve los comercios destacados.
 * @apiSuccess {String} UltimosAdheridos.NombreComercio Nombre del comercio.
 * @apiSuccess {String} UltimosAdheridos.Image Logo del comercio.
 * @apiSuccess {ObjectId} UltimosAdheridos._id Id del comercio.
 * @apiSuccess {Object[]} OfertasDestacadas Devuelve las ofertas destacadas.
 * @apiSuccess {String} OfertasDestacadas.Image Imagen de la oferta.
 * @apiSuccess {String} OfertasDestacadas.Url Url que linkea la imagen.
 * @apiSuccess {Object[]} Favoritos Devuelve los comercios destacados.
 * @apiSuccess {String} Favoritos.Label Título.
 * @apiSuccess {Object[]} Favoritos.Items Items.
 * @apiSuccess {String} Favoritos.Items.Image Imagen.
 * @apiSuccess {Number} Favoritos.Items.Precio Precio.
 */
/**
 * @api {POST} /getVouchers POST Vouchers
 * @apiName GetVouchers
 * @apiGroup Home
 * @apiSampleRequest http://52.36.173.82/api/getVouchers
 *
 * @apiParam {String} voucherCode Código del voucher.
 * @apiParam {String} voucherStatus Estado del voucher (EXPIRED,REDEEMED,VALID).
 * @apiParam {String} voucherType Tipo de voucher (GIFT, WELCOME).
 * @apiParam {String} promotionCode Código de promoción.
 * @apiParam {ObjectId} IdComercio Comercio del voucher.
 *
 * @apiSuccess {Object[]} vouchers Devuelve los vouchers.
 * @apiSuccess {String} vouchers Devuelve los vouchers.
 * @apiSuccess {String} vouchers.voucherCode Código del voucher
 * @apiSuccess {String} vouchers.currency Tipo de moneda.
 * @apiSuccess {Number} vouchers.voucherAmount Monto del voucher.
 * @apiSuccess {Date} vouchers.validUntil Fecha de vencimiento.
 * @apiSuccess {Number} vouchers.minSpendAmount Límite compra.
 * @apiSuccess {String} vouchers.bgColor Color voucher en RGB.
 * @apiSuccess {String} vouchers.voucherType Tipo de voucher.
 * @apiSuccess {String} vouchers.promotionCode Código de promoción.
 * @apiSuccess {String} vouchers.voucherStatus Estado del voucher.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      "RespCode": 0,
 *      "RespMessage": "OK",
 *       "vouchers": [
 *            {
 *              "voucherCode": "20010003000400005W",
 *              "currency": "€",
 *              "voucherAmount": "10",
 *              "validUntil": "2015-07-19T00:00:00",
 *              "minSpendAmount": "50",
 *              "bgColor": "#BFDC92",
 *              "voucherType": "GIFT",
 *              "promotionCode": "20010003000400005W",
 *              "voucherStatus": "EXPIRED"
 *            },
 *            {
 *              "voucherCode": "2001000300040000JQ",
 *              "currency": "€",
 *              "voucherAmount": "10",
 *              "validUntil": "2015-07-19T00:00:00",
 *              "minSpendAmount": "50",
 *              "bgColor": "#BFDC92",
 *              "voucherType": "GIFT",
 *              "promotionCode": "2001000300040000JQ",
 *              "voucherStatus": "REDEEMED"
 *            },
 *            {
 *              "voucherCode": "2706770708107",
 *              "currency": "",
 *              "voucherAmount": "10%",
 *              "validUntil": "2016-03-15T00:00:00",
 *              "minSpendAmount": "0",
 *              "bgColor": "#A8D3F3",
 *              "voucherType": "WELCOME",
 *              "promotionCode": "WLC10",
 *              "voucherStatus": "VALID"
 *            }
 *          ]
 *    });
 */
module.exports = function (app) {
  // Root routing
  var core = require('../controllers/core.server.controller');

  // Define error pages
  app.route('/server-error').get(core.renderServerError);

  app.route('/api/getHome').get(core.getHome);

  app.route('/api/getVouchers').post(core.getVouchers);

  // Return a 404 for all undefined api, module or lib routes
  app.route('/:url(api|modules|lib)/*').get(core.renderNotFound);

  // Define application route
  app.route('/*').get(core.renderIndex);
};
