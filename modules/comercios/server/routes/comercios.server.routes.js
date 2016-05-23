'use strict';

/**
 * @api {get} /comercios GET All Comercios
 * @apiSampleRequest http://52.36.173.82/api/comercios/572feac45e092de26d479487
 * @apiName GetComercios
 * @apiGroup Comercios
 * @apiSuccess {Object[]} Comercio Devuelve todos los comercios.
 */
/**
 * @api {get} /comercios/:id GET Comercio
 * @apiName GetComercio
 * @apiGroup Comercios
 *
 * @apiParam {ObjectId} _id Comercios unique ID.
 *
 * @apiSuccess {Object} Comercio Comercio.
 * @apiSuccess {String} Comercio.NombreComercio Nombre del comercio.
 * @apiSuccess {String} Comercio.Slogan Frase del comercio.
 * @apiSuccess {Object} Comercio.Horarios  Horarios.
 * @apiSuccess {String} Comercio.Email Email del comercio.
 * @apiSuccess {Object} Comercio.Horarios.LunesViernes Horarios de lunes a viernes.
 * @apiSuccess {Boolean} Comercio.Horarios.LunesViernes.Cortado Indica si el comercio trabaja de corrido o hace horario cortado.
 * @apiSuccess {Date} Comercio.Horarios.LunesViernes.DM Horario de apertura comercio a la mañana.
 * @apiSuccess {Date} Comercio.Horarios.LunesViernes.HM Horario de cierre comercio a la mañana (también aplica para comercios que están de corrido).
 * @apiSuccess {Date} Comercio.Horarios.LunesViernes.DT Horario de apertura comercio a la tarde (N/A para comercios que están de corrido).
 * @apiSuccess {Date} Comercio.Horarios.LunesViernes.HM Horario de cierre comercio a la tarde (N/A para comercios que están de corrido).
 * @apiSuccess {Object} Comercio.Horarios.Sabado Horarios sábado.
 * @apiSuccess {Boolean} Comercio.Horarios.Sabado.Cortado Indica si el comercio trabaja de corrido o hace horario cortado.
 * @apiSuccess {Date} Comercio.Horarios.Sabado.DM Horario de apertura comercio a la mañana.
 * @apiSuccess {Date} Comercio.Horarios.Sabado.HM Horario de cierre comercio a la mañana (también aplica para comercios que están de corrido).
 * @apiSuccess {Date} Comercio.Horarios.Sabado.DT Horario de apertura comercio a la tarde (N/A para comercios que están de corrido).
 * @apiSuccess {Date} Comercio.Horarios.Sabado.HM Horario de cierre comercio a la tarde (N/A para comercios que están de corrido).
 * @apiSuccess {Object} Comercio.Horarios.DomingoFeriado Horarios domingos y feriados.
 * @apiSuccess {Boolean} Comercio.Horarios.DomingoFeriado.Cortado Indica si el comercio trabaja de corrido o hace horario cortado.
 * @apiSuccess {Date} Comercio.Horarios.DomingoFeriado.DM Horario de apertura comercio a la mañana.
 * @apiSuccess {Date} Comercio.Horarios.DomingoFeriado.HM Horario de cierre comercio a la mañana (también aplica para comercios que están de corrido).
 * @apiSuccess {Date} Comercio.Horarios.DomingoFeriado.DT Horario de apertura comercio a la tarde (N/A para comercios que están de corrido).
 * @apiSuccess {Date} Comercio.Horarios.DomingoFeriado.HM Horario de cierre comercio a la tarde (N/A para comercios que están de corrido).
 * @apiSuccess {String} Comercio.UrlImageComercio Imagen principal del comercio.
 * @apiSuccess {String} Comercio.UrlImageLogo Logo del comercio.
 * @apiSuccess {Object[]} Comercio.ImagenesBanners Array de imágenes de banners del comercio.
 * @apiSuccess {String} Comercio.ImagenesBanners.Image Url de la imagen.
 * @apiSuccess {String} Comercio.ImagenesBanners.Url Url que linkea la imagen.
 * @apiSuccess {String} Comercio.Web Url del sitio web del comercio.
 * @apiSuccess {String} Comercio.Facebook Url de la página de Facebook del comercio.
 * @apiSuccess {Boolean} Comercio.FacebookLikes Comercio sincronizado con Facebook.
 * @apiSuccess {String} Comercio.Twitter Url de la página de Twitter del comercio.
 * @apiSuccess {Boolean} Comercio.TwitterFallow Comercio sincronizado con Twitter.
 * @apiSuccess {String} Comercio.Instagram Url de la página de Instagram del comercio.
 * @apiSuccess {Boolean} Comercio.EnvioADomicilio Indica si el comercio realiza envíos a domicilio
 * @apiSuccess {String} Comercio.Direccion Dirección del comercio.
 * @apiSuccess {String} Comercio.Telefono Teléfono del comercio.
 * @apiSuccess {String[]} Comercio.Tarjeta Tarjetas de crédito.
 * @apiSuccess {String} Comercio.Tarjeta.NombreTarjeta Nombre de la tarjeta de crédito.
 * @apiSuccess {Boolean} Comercio.Tarjeta.Acepta Indica si recibe esta tarjeta.
 * @apiSuccess {Number} Comercio.UbicacionLat Latitud en el mapa
 * @apiSuccess {Number} Comercio.UbicacionLon Longitud en el mapa
 * @apiSuccess {Number} Comercio.CantSeguidores Cantidad de usuarios que siguen el comercio.
 * @apiSuccess {Number} Comercio.CantPublicaciones Cantidad de productos publicados?
 * @apiSuccess {Number} Comercio.PuntuacionEstrellas Puntuación del comercio según criterio de los usuarios.
 * @apiSuccess {Object} Comercio.user Usuario dueño del comercio.
 * @apiSuccess {String} Comercio.user.DisplayName Nombre del dueño de comercio.
 * @apiSuccess {Object[]} Comercio.Productos Productos del comercio.            
 * @apiSuccess {Date} Comercio.Producto.created Fecha de creación del producto.
 * @apiSuccess {Number} Comercio.Producto.PorcentajeOferta Precio en caso de oferta.
 * @apiSuccess {Date} Comercio.Producto.OfertaValidaDesde Fecha desde que es válida la oferta.
 * @apiSuccess {Date} Comercio.Producto.OfertaValidaHasta Fecha que termina la oferta.
 * @apiSuccess {Boolean} Comercio.Producto.Temporizada ?
 * @apiSuccess {Boolean} Comercio.Producto.Oferta Indica si tiene el producto tiene oferta.
 * @apiSuccess {Number} Comercio.Producto.PrecioLista Precio del producto.
 * @apiSuccess {String[]} Comercio.Producto.ImagenGaleria Imagenes del producto.
 * @apiSuccess {String} Comercio.Producto.UrlPreviewPpal Imagen principal del producto.
 * @apiSuccess {Number} Comercio.Producto.Puntuacion Puntación del producto según criterio de los usuarios.
 * @apiSuccess {Date} Comercio.Producto.FechaUltimaActualizacion Fecha de la ultima actualización del producto.
 * @apiSuccess {String} Comercio.Producto.Descripcion Descripción del producto.
 * @apiSuccess {String} Comercio.Producto.NombreProducto Nombre del producto.
 * @apiSuccess {Boolean} Abierto Indica si el comercio se encuentra abierto actualmente.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      "RespCode": 0,
 *      "RespMessage": "OK",
 *      "Abierto": false,
 *      "Comercio": {
 *          "_id": "572feac45e092de26d479487",
 *          "user": {
 *              "_id": "56de0016231b51773e00c796",
 *              "displayName": "Matias Amuchastegui"
 *          },
 *          "UrlImageComercio": "uploads/56de0016231b51773e00c796/a26b0e2a1d5d80cdda29a608c663f2ac.jpg",
 *          "UrlImageLogo": "uploads/56de0016231b51773e00c796/f9940becda86bdf1f1dacc0b94251160.png",
 *          "Slogan": "Fabricar objetos de deseo",
 *          "Email": "mati.am.08@gmail.com",
 *          "Web": "http://www.rickysarkany.com/",
 *          "Facebook": "http://facebook.com/rickysarkany",
 *          "Instagram": "http://instagram.com/rickysarkany",
 *          "Twitter": "http://www.rickysarkany.com/",
 *          "Direccion": "Bv San Juan 879",
 *          "__v": 3,
 *          "Telefono": "3513098679",
 *          "Productos": [
 *              {
 *                  "_id": "57329f9dfa5c2baf7d2a4313",
 *                  "user": "56de0016231b51773e00c796",
 *                  "__v": 0,
 *                  "created": "2016-05-11T02:57:33.869Z",
 *                  "PorcentajeOferta": 4444,
 *                  "OfertaValidaDesde": "2016-05-11T02:57:09.777Z",
 *                  "OfertaValidaHasta": "2016-05-14T02:57:09.777Z",
 *                  "Temporizada": true,
 *                  "Oferta": true,
 *                  "PrecioLista": 5555,
 *                  "ImagenGaleria": [
 *                      "uploads/56de0016231b51773e00c796/feb04c31afbd4c7432b11eae398d385c.jpg",
 *                      "uploads/56de0016231b51773e00c796/cdc54bc044b068fb8d1780e027523354.jpg"
 *                  ],
 *                  "UrlPreviewPpal": "uploads/56de0016231b51773e00c796/cdc54bc044b068fb8d1780e027523354.jpg",
 *                  "Puntuacion": 0,
 *                  "FechaUltimaActualizacion": "2016-05-11T02:57:33.869Z",
 *                  "Descripcion": "Talle 4",
 *                  "NombreProducto": "Zapatos"
 *              },
 *              {
 *                  "_id": "5732a009fa5c2baf7d2a4315",
 *                  "user": "56de0016231b51773e00c796",
 *                  "__v": 0,
 *                  "created": "2016-05-11T02:59:21.569Z",
 *                  "PorcentajeOferta": 0,
 *                  "OfertaValidaDesde": "2016-05-11T02:59:24.536Z",
 *                  "OfertaValidaHasta": "2016-05-14T02:59:24.536Z",
 *                  "Temporizada": false,
 *                  "Oferta": false,
 *                  "PrecioLista": 1300,
 *                  "ImagenGaleria": [
 *                      "uploads/56de0016231b51773e00c796/3d6e2ce9a0dd2c50f5e7d81eaab30743.jpg"
 *                  ],
 *                  "UrlPreviewPpal": "uploads/56de0016231b51773e00c796/3d6e2ce9a0dd2c50f5e7d81eaab30743.jpg",
 *                  "Puntuacion": 0,
 *                  "FechaUltimaActualizacion": "2016-05-11T02:59:21.569Z",
 *                  "Descripcion": "She cheto",
 *                  "NombreProducto": "Zapatos 3"
 *              }
 *          ],
 *          "Tarjeta": [],
 *          "Horarios": {
 *              "DomingoFeriado": {
 *                  "Cortado": false
 *              },
 *              "Sabado": {
 *                  "DM": "1899-12-31T12:00:00.000Z",
 *                  "DT": "1899-12-31T19:00:00.000Z",
 *                  "HM": "1899-12-31T16:00:00.000Z",
 *                  "HT": "1900-01-01T01:00:00.000Z",
 *                  "Cortado": true
 *              },
 *              "LunesViernes": {
 *                  "DM": "1899-12-31T12:00:00.000Z",
 *                  "DT": "1899-12-31T12:00:00.000Z",
 *                  "HM": "1899-12-31T22:00:00.000Z",
 *                  "HT": "1899-12-31T22:00:00.000Z",
 *                  "Cortado": false
 *              }
 *          },
 *          "EnvioADomicilio": false,
 *          "TwitterFallow": false,
 *          "FacebookLiked": false,
 *          "PuntuacionEstrellas": 0,
 *          "CantPublicaciones": 0,
 *          "CantSeguidores": 0,
 *          "ImagenesBanners": [
 *              {
 *                Image: "uploads/56de0016231b51773e00c796/43b8e7d7eb75b3632bedac98123f5992.jpg",
 *                Url: "http://google.com"
 *              },
 *                Image: "uploads/56de0016231b51773e00c796/4ee7cd4502ec759dfd8045169479342a.jpg",
 *                Url: "http://google.com"
 *              },
 *                Image: "uploads/56de0016231b51773e00c796/18fd1272d7ba91da60ae62ff2c682d73.jpg"
 *                Url: "http://google.com"
 *              }
 *          }],
 *          "NombreComercio": "Riky Sarkany",
 *          "created": "2016-05-09T01:41:24.362Z"
 *      }
 *  }
 *
 * @apiError ComercioNotFound El id de comercio no existe.
 *
 * @apiErrorExample Error-Response Not Found:
 *     HTTP/1.1 404 Not Found
 *     {
 *        "RespCode": 1,
 *        "RespMessage": "El comercio no existe"
 *     }
 *
 * @apiError ComercioBadRequest El id de comercio tiene un formato incorrecto.
 *
 * @apiErrorExample Error-Response Bad Request:
 *     HTTP/1.1 400 Bad Request
 *     {
 *        "RespCode": 1,
 *        "RespMessage": "El comercio es inválido"
 *     }

 */

  
var comerciosPolicy = require('../policies/comercios.server.policy'),
  comercios = require('../controllers/comercios.server.controller');

module.exports = function (app) {
  // Comercios collection routes
  app.route('/api/comercios').all(comerciosPolicy.isAllowed)
    .get(comercios.list)
    .post(comercios.create);

  // Single comercio routes
  app.route('/api/comercios/:IdComercio')//.all(comerciosPolicy.isAllowed)
    .get(comercios.read)
    .put(comercios.update)
    .delete(comercios.delete);

  app.route('/api/agendarComercio').all(comerciosPolicy.isAllowed)
    .post(comercios.agendarComercio);
  
  app.route('/api/getAllComercios').all(comerciosPolicy.isAllowed)
    .get(comercios.getAllComercios);
  
  app.route('/api/setlikecomercio').all(comerciosPolicy.isAllowed)
    .post(comercios.setlikecomercio);
  
  app.route('/api/getComercio/:IdComercio').all(comerciosPolicy.isAllowed)
    .get(comercios.getComercio);
  
  app.route('/api/getLastComerciosAdheridos').all(comerciosPolicy.isAllowed)
    .get(comercios.getLastComerciosAdheridos);

  app.route('/api/getProductosPorComercio').all(comerciosPolicy.isAllowed)
    .post(comercios.getProductosPorComercio);

  app.route('/api/comercios/upload').all(comerciosPolicy.isAllowed)
    .post(comercios.uploadImage);

  // Finish by binding the comercio middleware
  app.param('IdComercio', comercios.comercioByID);
};
   


   