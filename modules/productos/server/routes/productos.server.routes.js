'use strict';

/**
 * @api {get} /productos GET All Productos
 * @apiName GetProductos
 * @apiGroup Productos
 * @apiSampleRequest http://52.36.173.82/api/productos
 * @apiSuccess {Object[]} Producto Devuelve todos los productos.
 */
/**
 * @api {get} /productos/:id GET Producto
 * @apiName GetProducto
 * @apiGroup Productos
 * @apiSampleRequest http://52.36.173.82/api/productos/57329f9dfa5c2baf7d2a4313
 * @apiParam {ObjectId} _id Productos unique ID.
 *
 * @apiSuccess {Object} Producto Producto.
 * @apiSuccess {String} Producto.NombreProducto Nombre del producto.
 * @apiSuccess {String} Producto.UrlImageProducto Imagen principal del producto.
 * @apiSuccess {Object[]} Productos Productos.            
 * @apiSuccess {Date} Producto.created Fecha de creación del producto.
 * @apiSuccess {Number} Producto.PorcentajeOferta Precio en caso de oferta.
 * @apiSuccess {Date} Producto.OfertaValidaDesde Fecha desde que es válida la oferta.
 * @apiSuccess {Date} Producto.OfertaValidaHasta Fecha que termina la oferta.
 * @apiSuccess {Boolean} Producto.Temporizada ?
 * @apiSuccess {Boolean} Producto.Oferta Indica si tiene el producto tiene oferta.
 * @apiSuccess {Number} Producto.PrecioLista Precio del producto.
 * @apiSuccess {String[]} Producto.ImagenGaleria Imagenes del producto.
 * @apiSuccess {String} Producto.UrlPreviewPpal Imagen principal del producto.
 * @apiSuccess {Number} Producto.Puntuacion Puntación del producto según criterio de los usuarios.
 * @apiSuccess {Date} Producto.FechaUltimaActualizacion Fecha de la ultima actualización del producto.
 * @apiSuccess {String} Producto.Descripcion Descripción del producto.
 * @apiSuccess {Boolean} Abierto Indica si el producto se encuentra abierto actualmente.
 *
 * @apiError ProductoNotFound El id de producto no existe.
 *
 * @apiErrorExample Error-Response Not Found:
 *     HTTP/1.1 404 Not Found
 *     {
 *        "RespCode": 1,
 *        "RespMessage": "El producto no existe"
 *     }
 *
 * @apiError ProductoBadRequest El id de producto tiene un formato incorrecto.
 *
 * @apiErrorExample Error-Response Bad Request:
 *     HTTP/1.1 400 Bad Request
 *     {
 *        "RespCode": 1,
 *        "RespMessage": "El producto es inválido"
 *     }

 */
var productosPolicy = require('../policies/productos.server.policy'),
  productos = require('../controllers/productos.server.controller');

module.exports = function (app) {
  // Productos collection routes
  app.route('/api/productos').all(productosPolicy.isAllowed)
    .get(productos.list)
    .post(productos.create);

  // Single producto routes
  app.route('/api/productos/:productoId')//.all(productosPolicy.isAllowed)
    .get(productos.read)
    .put(productos.update)
    .delete(productos.delete);

  // Finish by binding the producto middleware
  app.param('productoId', productos.productoByID);
};
