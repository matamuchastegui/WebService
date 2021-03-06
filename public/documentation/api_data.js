define({ "api": [
  {
    "type": "POST",
    "url": "/getCabeceras",
    "title": "POST Cabeceras",
    "name": "GetCabeceras",
    "group": "Comercios",
    "sampleRequest": [
      {
        "url": "http://52.36.173.82/api/getCabeceras"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "RegXPag",
            "description": "<p>Cantidad de registros por página.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Pag",
            "description": "<p>Número de página.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "Cabeceras",
            "description": "<p>Devuelve principales datos de comercios.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "UltimosAdheridos.Image",
            "description": "<p>Logo del comercio.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "UltimosAdheridos.Slogan",
            "description": "<p>Slogan del comercio.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "UltimosAdheridos.PuntuacionEstrellas",
            "description": "<p>Puntuación del comercio.</p>"
          },
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "UltimosAdheridos._id",
            "description": "<p>Id del comercio.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "modules/homes/server/routes/homes.server.routes.js",
    "groupTitle": "Comercios"
  },
  {
    "type": "get",
    "url": "/comercios/:id",
    "title": "GET Comercio",
    "name": "GetComercio",
    "group": "Comercios",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>Comercios unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Comercio",
            "description": "<p>Comercio.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Comercio.NombreComercio",
            "description": "<p>Nombre del comercio.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Comercio.Slogan",
            "description": "<p>Frase del comercio.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Comercio.Horarios",
            "description": "<p>Horarios.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Comercio.Email",
            "description": "<p>Email del comercio.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Comercio.Horarios.LunesViernes",
            "description": "<p>Horarios de lunes a viernes.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "Comercio.Horarios.LunesViernes.Cortado",
            "description": "<p>Indica si el comercio trabaja de corrido o hace horario cortado.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "Comercio.Horarios.LunesViernes.DM",
            "description": "<p>Horario de apertura comercio a la mañana.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "Comercio.Horarios.LunesViernes.HM",
            "description": "<p>Horario de cierre comercio a la mañana (también aplica para comercios que están de corrido).</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "Comercio.Horarios.LunesViernes.DT",
            "description": "<p>Horario de apertura comercio a la tarde (N/A para comercios que están de corrido).</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Comercio.Horarios.Sabado",
            "description": "<p>Horarios sábado.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "Comercio.Horarios.Sabado.Cortado",
            "description": "<p>Indica si el comercio trabaja de corrido o hace horario cortado.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "Comercio.Horarios.Sabado.DM",
            "description": "<p>Horario de apertura comercio a la mañana.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "Comercio.Horarios.Sabado.HM",
            "description": "<p>Horario de cierre comercio a la mañana (también aplica para comercios que están de corrido).</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "Comercio.Horarios.Sabado.DT",
            "description": "<p>Horario de apertura comercio a la tarde (N/A para comercios que están de corrido).</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Comercio.Horarios.DomingoFeriado",
            "description": "<p>Horarios domingos y feriados.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "Comercio.Horarios.DomingoFeriado.Cortado",
            "description": "<p>Indica si el comercio trabaja de corrido o hace horario cortado.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "Comercio.Horarios.DomingoFeriado.DM",
            "description": "<p>Horario de apertura comercio a la mañana.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "Comercio.Horarios.DomingoFeriado.HM",
            "description": "<p>Horario de cierre comercio a la mañana (también aplica para comercios que están de corrido).</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "Comercio.Horarios.DomingoFeriado.DT",
            "description": "<p>Horario de apertura comercio a la tarde (N/A para comercios que están de corrido).</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Comercio.UrlImageComercio",
            "description": "<p>Imagen principal del comercio.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Comercio.UrlImageLogo",
            "description": "<p>Logo del comercio.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "Comercio.ImagenesBanners",
            "description": "<p>Array de imágenes de banners del comercio.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Comercio.ImagenesBanners.Image",
            "description": "<p>Url de la imagen.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Comercio.ImagenesBanners.Url",
            "description": "<p>Url que linkea la imagen.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Comercio.Web",
            "description": "<p>Url del sitio web del comercio.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Comercio.Facebook",
            "description": "<p>Url de la página de Facebook del comercio.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "Comercio.FacebookLikes",
            "description": "<p>Comercio sincronizado con Facebook.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Comercio.Twitter",
            "description": "<p>Url de la página de Twitter del comercio.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "Comercio.TwitterFallow",
            "description": "<p>Comercio sincronizado con Twitter.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Comercio.Instagram",
            "description": "<p>Url de la página de Instagram del comercio.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "Comercio.EnvioADomicilio",
            "description": "<p>Indica si el comercio realiza envíos a domicilio</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Comercio.Direccion",
            "description": "<p>Dirección del comercio.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Comercio.Telefono",
            "description": "<p>Teléfono del comercio.</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "Comercio.Tarjeta",
            "description": "<p>Tarjetas de crédito.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Comercio.Tarjeta.NombreTarjeta",
            "description": "<p>Nombre de la tarjeta de crédito.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "Comercio.Tarjeta.Acepta",
            "description": "<p>Indica si recibe esta tarjeta.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "Comercio.UbicacionLat",
            "description": "<p>Latitud en el mapa</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "Comercio.UbicacionLon",
            "description": "<p>Longitud en el mapa</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "Comercio.CantSeguidores",
            "description": "<p>Cantidad de usuarios que siguen el comercio.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "Comercio.CantPublicaciones",
            "description": "<p>Cantidad de productos publicados?</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "Comercio.PuntuacionEstrellas",
            "description": "<p>Puntuación del comercio según criterio de los usuarios.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Comercio.user",
            "description": "<p>Usuario dueño del comercio.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Comercio.user.DisplayName",
            "description": "<p>Nombre del dueño de comercio.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "Comercio.Productos",
            "description": "<p>Productos del comercio.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "Comercio.Producto.created",
            "description": "<p>Fecha de creación del producto.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "Comercio.Producto.PorcentajeOferta",
            "description": "<p>Precio en caso de oferta.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "Comercio.Producto.OfertaValidaDesde",
            "description": "<p>Fecha desde que es válida la oferta.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "Comercio.Producto.OfertaValidaHasta",
            "description": "<p>Fecha que termina la oferta.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "Comercio.Producto.Temporizada",
            "description": "<p>?</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "Comercio.Producto.Oferta",
            "description": "<p>Indica si tiene el producto tiene oferta.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "Comercio.Producto.PrecioLista",
            "description": "<p>Precio del producto.</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "Comercio.Producto.ImagenGaleria",
            "description": "<p>Imagenes del producto.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Comercio.Producto.UrlPreviewPpal",
            "description": "<p>Imagen principal del producto.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "Comercio.Producto.Puntuacion",
            "description": "<p>Puntación del producto según criterio de los usuarios.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "Comercio.Producto.FechaUltimaActualizacion",
            "description": "<p>Fecha de la ultima actualización del producto.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Comercio.Producto.Descripcion",
            "description": "<p>Descripción del producto.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Comercio.Producto.NombreProducto",
            "description": "<p>Nombre del producto.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "Abierto",
            "description": "<p>Indica si el comercio se encuentra abierto actualmente.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n   {\n    \"RespCode\": 0,\n    \"RespMessage\": \"OK\",\n    \"Abierto\": false,\n    \"Comercio\": {\n        \"_id\": \"572feac45e092de26d479487\",\n        \"user\": {\n            \"_id\": \"56de0016231b51773e00c796\",\n            \"displayName\": \"Matias Amuchastegui\"\n        },\n        \"UrlImageComercio\": \"uploads/56de0016231b51773e00c796/a26b0e2a1d5d80cdda29a608c663f2ac.jpg\",\n        \"UrlImageLogo\": \"uploads/56de0016231b51773e00c796/f9940becda86bdf1f1dacc0b94251160.png\",\n        \"Slogan\": \"Fabricar objetos de deseo\",\n        \"Email\": \"mati.am.08@gmail.com\",\n        \"Web\": \"http://www.rickysarkany.com/\",\n        \"Facebook\": \"http://facebook.com/rickysarkany\",\n        \"Instagram\": \"http://instagram.com/rickysarkany\",\n        \"Twitter\": \"http://www.rickysarkany.com/\",\n        \"Direccion\": \"Bv San Juan 879\",\n        \"__v\": 3,\n        \"Telefono\": \"3513098679\",\n        \"Productos\": [\n            {\n                \"_id\": \"57329f9dfa5c2baf7d2a4313\",\n                \"user\": \"56de0016231b51773e00c796\",\n                \"__v\": 0,\n                \"created\": \"2016-05-11T02:57:33.869Z\",\n                \"PorcentajeOferta\": 4444,\n                \"OfertaValidaDesde\": \"2016-05-11T02:57:09.777Z\",\n                \"OfertaValidaHasta\": \"2016-05-14T02:57:09.777Z\",\n                \"Temporizada\": true,\n                \"Oferta\": true,\n                \"PrecioLista\": 5555,\n                \"ImagenGaleria\": [\n                    \"uploads/56de0016231b51773e00c796/feb04c31afbd4c7432b11eae398d385c.jpg\",\n                    \"uploads/56de0016231b51773e00c796/cdc54bc044b068fb8d1780e027523354.jpg\"\n                ],\n                \"UrlPreviewPpal\": \"uploads/56de0016231b51773e00c796/cdc54bc044b068fb8d1780e027523354.jpg\",\n                \"Puntuacion\": 0,\n                \"FechaUltimaActualizacion\": \"2016-05-11T02:57:33.869Z\",\n                \"Descripcion\": \"Talle 4\",\n                \"NombreProducto\": \"Zapatos\"\n            },\n            {\n                \"_id\": \"5732a009fa5c2baf7d2a4315\",\n                \"user\": \"56de0016231b51773e00c796\",\n                \"__v\": 0,\n                \"created\": \"2016-05-11T02:59:21.569Z\",\n                \"PorcentajeOferta\": 0,\n                \"OfertaValidaDesde\": \"2016-05-11T02:59:24.536Z\",\n                \"OfertaValidaHasta\": \"2016-05-14T02:59:24.536Z\",\n                \"Temporizada\": false,\n                \"Oferta\": false,\n                \"PrecioLista\": 1300,\n                \"ImagenGaleria\": [\n                    \"uploads/56de0016231b51773e00c796/3d6e2ce9a0dd2c50f5e7d81eaab30743.jpg\"\n                ],\n                \"UrlPreviewPpal\": \"uploads/56de0016231b51773e00c796/3d6e2ce9a0dd2c50f5e7d81eaab30743.jpg\",\n                \"Puntuacion\": 0,\n                \"FechaUltimaActualizacion\": \"2016-05-11T02:59:21.569Z\",\n                \"Descripcion\": \"She cheto\",\n                \"NombreProducto\": \"Zapatos 3\"\n            }\n        ],\n        \"Tarjeta\": [],\n        \"Horarios\": {\n            \"DomingoFeriado\": {\n                \"Cortado\": false\n            },\n            \"Sabado\": {\n                \"DM\": \"1899-12-31T12:00:00.000Z\",\n                \"DT\": \"1899-12-31T19:00:00.000Z\",\n                \"HM\": \"1899-12-31T16:00:00.000Z\",\n                \"HT\": \"1900-01-01T01:00:00.000Z\",\n                \"Cortado\": true\n            },\n            \"LunesViernes\": {\n                \"DM\": \"1899-12-31T12:00:00.000Z\",\n                \"DT\": \"1899-12-31T12:00:00.000Z\",\n                \"HM\": \"1899-12-31T22:00:00.000Z\",\n                \"HT\": \"1899-12-31T22:00:00.000Z\",\n                \"Cortado\": false\n            }\n        },\n        \"EnvioADomicilio\": false,\n        \"TwitterFallow\": false,\n        \"FacebookLiked\": false,\n        \"PuntuacionEstrellas\": 0,\n        \"CantPublicaciones\": 0,\n        \"CantSeguidores\": 0,\n        \"ImagenesBanners\": [\n            {\n              Image: \"uploads/56de0016231b51773e00c796/43b8e7d7eb75b3632bedac98123f5992.jpg\",\n              Url: \"http://google.com\"\n            },\n              Image: \"uploads/56de0016231b51773e00c796/4ee7cd4502ec759dfd8045169479342a.jpg\",\n              Url: \"http://google.com\"\n            },\n              Image: \"uploads/56de0016231b51773e00c796/18fd1272d7ba91da60ae62ff2c682d73.jpg\"\n              Url: \"http://google.com\"\n            }\n        }],\n        \"NombreComercio\": \"Riky Sarkany\",\n        \"created\": \"2016-05-09T01:41:24.362Z\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ComercioNotFound",
            "description": "<p>El id de comercio no existe.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ComercioBadRequest",
            "description": "<p>El id de comercio tiene un formato incorrecto.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n   \"RespCode\": 1,\n   \"RespMessage\": \"El comercio no existe\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response Bad Request:",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"RespCode\": 1,\n   \"RespMessage\": \"El comercio es inválido\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "modules/comercios/server/routes/comercios.server.routes.js",
    "groupTitle": "Comercios"
  },
  {
    "type": "get",
    "url": "/comercios",
    "title": "GET All Comercios",
    "sampleRequest": [
      {
        "url": "http://52.36.173.82/api/comercios/572feac45e092de26d479487"
      }
    ],
    "name": "GetComercios",
    "group": "Comercios",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "Comercio",
            "description": "<p>Devuelve todos los comercios.</p>"
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"RegXPag\": 5,\n  \"Pag\": 0\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "modules/comercios/server/routes/comercios.server.routes.js",
    "groupTitle": "Comercios"
  },
  {
    "type": "get",
    "url": "/cupones/:id",
    "title": "GET Cupon",
    "name": "GetCupon",
    "group": "Cupones",
    "sampleRequest": [
      {
        "url": "http://52.36.173.82/api/cupones/573bcee3a9a7c45d2e03f19f"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>Cupones unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Cupon",
            "description": "<p>Cupon.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Cupon.NombreCupon",
            "description": "<p>Nombre del cupón.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "Cupon.ValidFrom",
            "description": "<p>Fecha de validez del cupón.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "Cupon.ValidTo",
            "description": "<p>Fecha de vencimiento del cupón.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "Cupon.created",
            "description": "<p>Fecha de creación del cupón.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "Cupon.CuponBarcode",
            "description": "<p>Código de barras.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "Cupon.OfertaValidaDesde",
            "description": "<p>Fecha desde que es válida la oferta.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "Cupon.OfertaValidaHasta",
            "description": "<p>Fecha que termina la oferta.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "Cupon.Temporizada",
            "description": "<p>?</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Cupon.CuponStatus",
            "description": "<p>Estado del cupón.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Cupon.CuponType",
            "description": "<p>Tipo de cupón.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Cupon.Description",
            "description": "<p>Descripción del cupón.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Cupon.CuponUrl",
            "description": "<p>Imagen del cupón.</p>"
          },
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "Cupon.Comercio",
            "description": "<p>Id del comercio.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CuponNotFound",
            "description": "<p>El id de cupón no existe.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CuponBadRequest",
            "description": "<p>El id de cupón tiene un formato incorrecto.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n   \"RespCode\": 1,\n   \"RespMessage\": \"El cupón no existe\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response Bad Request:",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"RespCode\": 1,\n   \"RespMessage\": \"El cupon es inválido\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "modules/cupones/server/routes/cupones.server.routes.js",
    "groupTitle": "Cupones"
  },
  {
    "type": "get",
    "url": "/cupones",
    "title": "GET All Cupones",
    "name": "GetCupones",
    "group": "Cupones",
    "sampleRequest": [
      {
        "url": "http://52.36.173.82/api/cupones"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "Cupon",
            "description": "<p>Devuelve todos los cupones.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "modules/cupones/server/routes/cupones.server.routes.js",
    "groupTitle": "Cupones"
  },
  {
    "type": "get",
    "url": "/getHome",
    "title": "GET Pantalla principal",
    "name": "GetHome",
    "group": "Home",
    "sampleRequest": [
      {
        "url": "http://52.36.173.82/api/getHome"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "Banners",
            "description": "<p>Devuelve los banners de portada.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Banners.Image",
            "description": "<p>Url de la imagen.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Banners.Url",
            "description": "<p>Url que linkea la imagen.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "UltimosAdheridos",
            "description": "<p>Devuelve los comercios destacados.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "UltimosAdheridos.NombreComercio",
            "description": "<p>Nombre del comercio.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "UltimosAdheridos.Image",
            "description": "<p>Logo del comercio.</p>"
          },
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "UltimosAdheridos._id",
            "description": "<p>Id del comercio.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "OfertasDestacadas",
            "description": "<p>Devuelve las ofertas destacadas.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "OfertasDestacadas.Image",
            "description": "<p>Imagen de la oferta.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "OfertasDestacadas.Url",
            "description": "<p>Url que linkea la imagen.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "Favoritos",
            "description": "<p>Devuelve los comercios destacados.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Favoritos.Label",
            "description": "<p>Título.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "Favoritos.Items",
            "description": "<p>Items.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Favoritos.Items.Image",
            "description": "<p>Imagen.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "Favoritos.Items.Precio",
            "description": "<p>Precio.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "modules/core/server/routes/core.server.routes.js",
    "groupTitle": "Home"
  },
  {
    "type": "POST",
    "url": "/getVouchers",
    "title": "POST Vouchers",
    "name": "GetVouchers",
    "group": "Home",
    "sampleRequest": [
      {
        "url": "http://52.36.173.82/api/getVouchers"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "voucherCode",
            "description": "<p>Código del voucher.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "voucherStatus",
            "description": "<p>Estado del voucher (EXPIRED,REDEEMED,VALID).</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "voucherType",
            "description": "<p>Tipo de voucher (GIFT, WELCOME).</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "promotionCode",
            "description": "<p>Código de promoción.</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "IdComercio",
            "description": "<p>Comercio del voucher.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "vouchers",
            "description": "<p>Devuelve los vouchers.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "vouchers.voucherCode",
            "description": "<p>Código del voucher</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "vouchers.currency",
            "description": "<p>Tipo de moneda.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "vouchers.voucherAmount",
            "description": "<p>Monto del voucher.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "vouchers.validUntil",
            "description": "<p>Fecha de vencimiento.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "vouchers.minSpendAmount",
            "description": "<p>Límite compra.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "vouchers.bgColor",
            "description": "<p>Color voucher en RGB.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "vouchers.voucherType",
            "description": "<p>Tipo de voucher.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "vouchers.promotionCode",
            "description": "<p>Código de promoción.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "vouchers.voucherStatus",
            "description": "<p>Estado del voucher.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n {\n  \"RespCode\": 0,\n  \"RespMessage\": \"OK\",\n   \"vouchers\": [\n        {\n          \"voucherCode\": \"20010003000400005W\",\n          \"currency\": \"€\",\n          \"voucherAmount\": \"10\",\n          \"validUntil\": \"2015-07-19T00:00:00\",\n          \"minSpendAmount\": \"50\",\n          \"bgColor\": \"#BFDC92\",\n          \"voucherType\": \"GIFT\",\n          \"promotionCode\": \"20010003000400005W\",\n          \"voucherStatus\": \"EXPIRED\"\n        },\n        {\n          \"voucherCode\": \"2001000300040000JQ\",\n          \"currency\": \"€\",\n          \"voucherAmount\": \"10\",\n          \"validUntil\": \"2015-07-19T00:00:00\",\n          \"minSpendAmount\": \"50\",\n          \"bgColor\": \"#BFDC92\",\n          \"voucherType\": \"GIFT\",\n          \"promotionCode\": \"2001000300040000JQ\",\n          \"voucherStatus\": \"REDEEMED\"\n        },\n        {\n          \"voucherCode\": \"2706770708107\",\n          \"currency\": \"\",\n          \"voucherAmount\": \"10%\",\n          \"validUntil\": \"2016-03-15T00:00:00\",\n          \"minSpendAmount\": \"0\",\n          \"bgColor\": \"#A8D3F3\",\n          \"voucherType\": \"WELCOME\",\n          \"promotionCode\": \"WLC10\",\n          \"voucherStatus\": \"VALID\"\n        }\n      ]\n});",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "modules/core/server/routes/core.server.routes.js",
    "groupTitle": "Home"
  },
  {
    "type": "get",
    "url": "/productos/:id",
    "title": "GET Producto",
    "name": "GetProducto",
    "group": "Productos",
    "sampleRequest": [
      {
        "url": "http://52.36.173.82/api/productos/57329f9dfa5c2baf7d2a4313"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>Productos unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Producto",
            "description": "<p>Producto.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Producto.NombreProducto",
            "description": "<p>Nombre del producto.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Producto.UrlImageProducto",
            "description": "<p>Imagen principal del producto.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "Productos",
            "description": "<p>Productos.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "Producto.created",
            "description": "<p>Fecha de creación del producto.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "Producto.PorcentajeOferta",
            "description": "<p>Precio en caso de oferta.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "Producto.OfertaValidaDesde",
            "description": "<p>Fecha desde que es válida la oferta.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "Producto.OfertaValidaHasta",
            "description": "<p>Fecha que termina la oferta.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "Producto.Temporizada",
            "description": "<p>?</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "Producto.Oferta",
            "description": "<p>Indica si tiene el producto tiene oferta.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "Producto.PrecioLista",
            "description": "<p>Precio del producto.</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "Producto.ImagenGaleria",
            "description": "<p>Imagenes del producto.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Producto.UrlPreviewPpal",
            "description": "<p>Imagen principal del producto.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "Producto.Puntuacion",
            "description": "<p>Puntación del producto según criterio de los usuarios.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "Producto.FechaUltimaActualizacion",
            "description": "<p>Fecha de la ultima actualización del producto.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Producto.Descripcion",
            "description": "<p>Descripción del producto.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "Abierto",
            "description": "<p>Indica si el producto se encuentra abierto actualmente.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ProductoNotFound",
            "description": "<p>El id de producto no existe.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ProductoBadRequest",
            "description": "<p>El id de producto tiene un formato incorrecto.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n   \"RespCode\": 1,\n   \"RespMessage\": \"El producto no existe\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response Bad Request:",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"RespCode\": 1,\n   \"RespMessage\": \"El producto es inválido\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "modules/productos/server/routes/productos.server.routes.js",
    "groupTitle": "Productos"
  },
  {
    "type": "get",
    "url": "/productos",
    "title": "GET All Productos",
    "name": "GetProductos",
    "group": "Productos",
    "sampleRequest": [
      {
        "url": "http://52.36.173.82/api/productos"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "Producto",
            "description": "<p>Devuelve todos los productos.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "modules/productos/server/routes/productos.server.routes.js",
    "groupTitle": "Productos"
  }
] });
