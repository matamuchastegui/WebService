'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Comercio = mongoose.model('Comercio'),
  Usuario = mongoose.model('Usuario'),
  multer = require('multer'),
  fs = require('fs'),
  _ = require('lodash'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

var hcAgenda = [  
        {  
          IdComercio:2,
          NombreComercio:'nombre',
          UbicacionLat:'1231',
          UbicacionLon:'1231',
          UrlImageComercio:'https://s3-us-west-2.amazonaws.com/decomprasimg/comercios/comercio.jpg',
          UrlImageLogo:'https://s3-us-west-2.amazonaws.com/decomprasimg/comercios/comercio1.jpg',
          ImagenesPromociones:[ 
            {  
              UrlImagePromocion:'https://s3-us-west-2.amazonaws.com/decomprasimg/promociones/img1.jpg'
            },
            {  
              UrlImagePromocion:'https://s3-us-west-2.amazonaws.com/decomprasimg/promociones/img2.jpg'
            },
            {  
              UrlImagePromocion:'https://s3-us-west-2.amazonaws.com/decomprasimg/promociones/img3.jpg'
            },
            {  
              UrlImagePromocion:'https://s3-us-west-2.amazonaws.com/decomprasimg/promociones/img4.jpg'
            },
            {  
              UrlImagePromocion:'https://s3-us-west-2.amazonaws.com/decomprasimg/promociones/img5.jpg'
            }
          ],
          Slogan:'tuComercio',
          CantSeguidores:'',
          CantPublicaciones:'',
          PuntuaciónEstrellas:3,
          Telefonos:[  
            {  
              Numero:351261265
            },
            {  
              Numero:351261265
            },
            {  
              Numero:351261265
            },
            {  
              Numero:351261265
            },
            {  
              Numero:351261265
            },

          ],
          Email:'email@mail.com',
          Web:'web',
          Facebook:'feibu',
          FacebookLiked:true,
          Instagram:'instagram',
          Twitter:'twitter',
          TwitterFallow:true,
          Tarjetas:[  
            {  
              NombreTarjeta:'naranja',
              Descripcion:'hasta 12 cuotas sin interés'
            }
          ],
          EnvioADomicilio:true
        }
      ];
  var hcCupon = [  
        {  
          CuponId:1234,
          CuponBarcode:1234242342,
          CuponType:'WELKOM',
          CuponStatus:'Expired',
          Description:'',
          ValidFrom:'',
          ValidTo:'',
          CuponUrl:'https://s3-us-west-2.amazonaws.com/decomprasimg/cupon/cupon.jpg',
          ComercioId:2123,
          CuponUsado:false,
          Temporizado:false
        }
      ];
/**
 * Create a comercio
 */
exports.create = function (req, res) {    
  var comercio = new Comercio(req.body);

  comercio.user = req.user;

  comercio.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(comercio);
    }
  });
};

/**
 * Show the current comercio
 */
exports.read = function (req, res) {

  res.json(
    req.comercio
  );
};

/**
 * Update a comercio
 */
exports.update = function (req, res) {  
  var comercio = req.comercio;
  comercio = _.extend(comercio, req.body);
  
  comercio.save(function (err) {
    if (err) {      
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(comercio);      
    }
  });
};

/**
 * Delete an comercio
 */
exports.delete = function (req, res) {
  var comercio = req.comercio;

  comercio.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(comercio);
    }
  });
};

/**
 * List of Comercios
 */
exports.list = function (req, res) {
  Comercio.find({user: req.user._id}).sort('-created').populate('user', 'displayName').exec(function (err, comercios) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(comercios);
    }
  });
};

exports.agendarComercio = function (req, res) {
  Usuario.findOne({IdUsuario: req.body.IdUsuario}).exec(function (err, usuario) {
    // Usuario.findOne({IdUsuario: id}).exec(function (err, usuario) {
    if (err) {
      return res.status(400).send({
        RespCode: 1,
        RespMessage: errorHandler.getErrorMessage(err)
      });
    } 
    if (!usuario) {
      return res.status(400).send({
        RespCode: 1,
        RespMessage: 'El usuario no existe'
      });
    } else{
      res.json({
        RespCode:0,
        RespMessage:'Ok, se ha actualizado su agenda correctamente',
      });
    }
  });  
};

exports.getAllComercios = function (req, res) {
  res.json({
    RespCode:0,
    RespMessage:'Ok',
    Comercios:[
      {
      IdComercio:123,
      NombreComercio:'nombre',
      UbicacionLat:'1231',
      UbicacionLon:'1231',
      UrlImageComercio:'https://s3-us-west-2.amazonaws.com/decomprasimg/test.jpg',
      UrlImageLogo:'https://s3-us-west-2.amazonaws.com/decomprasimg/test.jpg',
      ImagenesPromociones:[
        {UrlImagePromocion:'https://s3-us-west-2.amazonaws.com/decomprasimg/test.jpg'},
        {UrlImagePromocion:'https://s3-us-west-2.amazonaws.com/decomprasimg/test.jpg'},
        {UrlImagePromocion:'https://s3-us-west-2.amazonaws.com/decomprasimg/test.jpg'},
        {UrlImagePromocion:'https://s3-us-west-2.amazonaws.com/decomprasimg/test.jpg'},
        {UrlImagePromocion:'https://s3-us-west-2.amazonaws.com/decomprasimg/test.jpg'}
      ],
      Slogan:'tuComercio',
      CantSeguidores:'',
      CantPublicaciones:'',
      PuntuaciónEstrellas:3,
      Telefonos:[
        {Numero:'351261265'},
        {Numero:'351261265'},
        {Numero:'351261265'},
        {Numero:'351261265'},
        {Numero:'351261265'},
      ],
      Email:'email@mail.com',
      Web:'web',
      Facebook:'feibu',
      FacebookLiked:true,
      Instagram:'instagram',
      Twitter:'twitter',
      TwitterFallow:true,
      Tarjeta:[
      {
      NombreTarjeta:'naranja',
      Descripcion:'hasta 12 cuotas sin interés'
      }
      ],
      EnvioADomicilio:true
      }
    ],
    Cupon:[
      {
      IdCupon:'1234',
      CuponBarcode:'1234242342',
      CuponType:'WELKOM',
      CuponStatus:'Expired',
      Description:'',
      ValidFrom:'',
      ValidTo:'',
      CuponUrl:'https://s3-us-west-2.amazonaws.com/decomprasimg/test.jpg',
      ComercioId:'2123',
      CuponUsado:false,
      Temporizado:false
      }
    ]
  });
};

exports.setlikecomercio = function (req, res) {
  res.json({
    RespCode:0,
    RespMessage:'Ok',
    Premio:[
    {
      IdCupon:'1234',
      CuponBarcode:'1234242342',
      CuponType:'WELKOM',
      CuponStatus:'Expired',
      Description:'Ha obtenido este descuento por haber likeado nuestro comercio!!!',
      ValidFrom:'',
      ValidTo:'',
      CuponUrl:'https://s3-us-west-2.amazonaws.com/decomprasimg/test.jpg',
      IdComercio:'2123',
      CuponUsado:false,
      Temporizado:false
    }
    ]
  });
};

exports.getComercio = function (req, res) {

  res.jsonp({
    RespCode:0,
    RespMessage:'Ok',
    Comercio: req.comercio
  });
  // res.json({
  //   RespCode:0,
  //   RespMessage:'Ok',
  //   Comercio:{
  //     IdComercio:123,
  //     NombreComercio:'nombre',
  //     UbicacionLat:'1231',
  //     UbicacionLon:'1231',
  //     UrlImageComercio:'https://s3-us-west-2.amazonaws.com/decomprasimg/test.jpg',
  //     UrlImageLogo:'https://s3-us-west-2.amazonaws.com/decomprasimg/test.jpg',
  //     ImagenesPromociones:[
  //       {UrlImagePromocion:'https://s3-us-west-2.amazonaws.com/decomprasimg/test.jpg'},
  //       {UrlImagePromocion:'https://s3-us-west-2.amazonaws.com/decomprasimg/test.jpg'},
  //       {UrlImagePromocion:'https://s3-us-west-2.amazonaws.com/decomprasimg/test.jpg'},
  //       {UrlImagePromocion:'https://s3-us-west-2.amazonaws.com/decomprasimg/test.jpg'},
  //       {UrlImagePromocion:'https://s3-us-west-2.amazonaws.com/decomprasimg/test.jpg'}
  //     ],
  //     Slogan:'tuComercio',
  //     CantSeguidores:'',
  //     CantPublicaciones:'',
  //     PuntuaciónEstrellas:3,
  //     Telefonos:[
  //       {Numero:'351261265'},
  //       {Numero:'351261265'},
  //       {Numero:'351261265'},
  //       {Numero:'351261265'},
  //       {Numero:'351261265'},
  //     ],
  //     Email:'email@mail.com',
  //     Web:'web',
  //     Facebook:'feibu',
  //     FacebookLiked:true,
  //     Instagram:'instagram',
  //     Twitter:'twitter',
  //     TwitterFallow:true,
  //     Tarjeta:[
  //       {
  //         NombreTarjeta:'naranja',
  //         Descripcion:'hasta 12 cuotas sin interés'
  //       }
  //     ],
  //     EnvioADomicilio:true
  //     },
  //     Cupon:[
  //     {
  //     IdCupon:'1234',
  //     CuponBarcode:'1234242342',
  //     CuponType:'WELKOM',
  //     CuponStatus:'Expired',
  //     Description:'',
  //     ValidFrom:'',
  //     ValidTo:'',
  //     CuponUrl:'https://s3-us-west-2.amazonaws.com/decomprasimg/test.jpg',
  //     IdComercio:'2123',
  //     CuponUsado:false,
  //     Temporizado:false
  //     }
  //     ],
  //     LastTenProducts:[
  //     {
  //     IdProducto:'1234',
  //     NombreProducto:'Vestite como se debe en verano!!!',
  //     Descripcion:'camisa, pantalón y zapatos',
  //     FechaUltimaActualizacion:'12-3-2016 12:51',
  //     Puntuacion:5,
  //     UrlPreviewPpal:'https://s3-us-west-2.amazonaws.com/decomprasimg/test.jpg',
  //     ImagenGaleria:[
  //     {UrlImageGaleria:'https://s3-us-west-2.amazonaws.com/decomprasimg/test.jpg'},
  //     {UrlImageGaleria:'https://s3-us-west-2.amazonaws.com/decomprasimg/test.jpg'},
  //     {UrlImageGaleria:'https://s3-us-west-2.amazonaws.com/decomprasimg/test.jpg'},
  //     {UrlImageGaleria:'https://s3-us-west-2.amazonaws.com/decomprasimg/test.jpg'},
  //     {UrlImageGaleria:'https://s3-us-west-2.amazonaws.com/decomprasimg/test.jpg'}
  //     ],
  //     PrecioLista:'52.23',
  //     Oferta:true,
  //     Temporizada:true,
  //     OfertaValidaHasta:'12-6-1995 12:56',
  //     OfertaValidaDesde:'12-6-1995 14:26',
  //     PrecioOferta:'30.25'
  //     }
  //     ]

  // });
};

exports.getLastComerciosAdheridos = function (req, res) {
  res.json({
    RespCode:0,
    RespMessage:'Ok',
    Comercio:[
      {
        IdComercio:123,
        NombreComercio:'nombre',
        UrlImageLogo:'https://s3-us-west-2.amazonaws.com/decomprasimg/test.jpg',
        Slogan:'tuComercio'
      }
    ]
  });
};

exports.getProductosPorComercio = function (req, res) {
  var fechaDesde = new Date().toLocaleString();
  var fechaHasta = new Date(new Date() + 604800000).toLocaleString();

  res.json({
    RespCode:0,
    RespMessage:'Ok',
    Productos:[
      {
      IdProducto:'1234',
      NombreProducto:'Vestite como se debe en verano!!!',
      Descripcion:'camisa, pantalón y zapatos',
      FechaUltimaActualizacion:'12-3-2016 12:51',
      Puntuacion:5,
      UrlPreviewPpal:'https://s3-us-west-2.amazonaws.com/decomprasimg/test.jpg',
      ImagenGaleria:[
      {UrlImageGaleria:'https://s3-us-west-2.amazonaws.com/decomprasimg/test.jpg'},
      {UrlImageGaleria:'https://s3-us-west-2.amazonaws.com/decomprasimg/test.jpg'},
      {UrlImageGaleria:'https://s3-us-west-2.amazonaws.com/decomprasimg/test.jpg'},
      {UrlImageGaleria:'https://s3-us-west-2.amazonaws.com/decomprasimg/test.jpg'},
      {UrlImageGaleria:'https://s3-us-west-2.amazonaws.com/decomprasimg/test.jpg'}
      ],
      PrecioLista:'52.23',
      Oferta:true,
      Temporizada:true,
      OfertaValidaHasta: fechaHasta,
      OfertaValidaDesde: fechaDesde,
      PrecioOferta:'30.25'
      }
    ]
  });
};

exports.uploadImage = function (req, res) {
  var user = req.user;
  var message = null;
  var dir = './public/uploads/' + req.user._id + '/';
  if (!fs.existsSync(dir))
    fs.mkdirSync(dir);
  fs.writeFile(dir + req.files.file.name, req.files.file.buffer, function (uploadError) {
    if (uploadError) {
      return res.status(400).send({
        message: 'Error al subir la imagen'
      });
    } else {
      res.json({ message:'Imagen subida con éxito', url: 'uploads/' + req.user._id + '/' + req.files.file.name });
    }
  });
};

exports.uploadImage2 = function (req, res) {  
  var message = null;

  var upload = multer({ dest:'./public/uploads/', limits: { fileSize: 1048576 } }).single('newProfilePicture');
  var profileUploadFileFilter = require(path.resolve('./config/lib/multer')).profileUploadFileFilter;

  upload.fileFilter = profileUploadFileFilter;
  upload(req, res, function (uploadError) {    
    if(uploadError) {
      return res.status(400).send({
        message: 'Error al subir la imagen'
      });
    } else {
      res.json({ message:'Imagen subida con éxito', url: '/uploads/' + req.file.filename });
    }
  });
};

/**
 * Comercio middleware
 */
exports.comercioByID = function (req, res, next, id) {  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'El comercio es inválido'
    });
  }

  Comercio.findById(id).populate('user', 'displayName').populate('Productos').exec(function(err, comercio) {     
    if (err) {
      return next(err);
    } else if (!comercio) {
      return res.status(400).send({
        RespCode:1,
        RespMessage: 'El comercio no existe'
      });
    }
    req.comercio = comercio;
    next();
  });
};
