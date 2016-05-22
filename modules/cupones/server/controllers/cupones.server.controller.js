'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Cupon = mongoose.model('Cupon'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

var hcCupon = [  
  {  
    cuponId:1234,
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
 * Create a Cupon
 */
exports.create = function (req, res) {
  console.log('req.body',req.body);
  var cupon = new Cupon(req.body);

  cupon.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(cupon);
    }
  });
};

/**
 * Show the current Cupon
 */
exports.read = function (req, res) {
   if(req.bo)
    res.json(req.cupon);
  else
    res.json({
      RespCode:0, 
      RespMessage:'OK',
      Cupon: req.cupon
    });
};

/**
 * Update a Cupon
 */
exports.update = function (req, res) {
  var cupon = req.cupon;

  // Cupon.title = req.body.title;
  cupon.content = req.body.content;
  cupon.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(cupon);
    }
  });
};

/**
 * Delete an Cupon
 */
exports.delete = function (req, res) {
  var cupon = req.cupon;

  cupon.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(cupon);
    }
  });
};

/**
 * List of Cupones
 */
exports.list = function (req, res) {
  var RegXPag = req.query.RegXPag;
  var Pag = req.query.Pag;
  Cupon.find().sort('-created').limit(RegXPag).skip(RegXPag * Pag).populate('user', 'displayName').exec(function (err, cupones) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(cupones);
    }
  });
};

exports.registrarCupon = function (req, res) {
  res.json({
    RespCode:0,
    RespMessage:'Ok, se ha registrado su cupón',
  });
};

exports.getAllCupons = function (req, res) {
  res.json({
    RespCode:0,
    RespMessage:'Ok',
    Cupon:hcCupon
  });
};

/**
 * Cupon middleware
 */
exports.CuponByID = function (req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Cupon is invalid'
    });
  }

  Cupon.findById(id).populate('user', 'displayName').exec(function (err, cupon) {
    if (err) {
      return next(err);
    } else if (!cupon) {
      return res.status(404).send({
        message: 'No Cupon with that identifier has been found'
      });
    }
    req.bo = req.query.bo;
    req.cupon = cupon;
    next();
  });
};
