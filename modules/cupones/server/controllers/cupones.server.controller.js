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
 * Create a Cupon
 */
exports.create = function (req, res) {
  var Cupon = new Cupon(req.body);
  Cupon.user = req.user;

  Cupon.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(Cupon);
    }
  });
};

/**
 * Show the current Cupon
 */
exports.read = function (req, res) {
  res.json(parseInt(req.Cupon.content));
};

/**
 * Update a Cupon
 */
exports.update = function (req, res) {
  var Cupon = req.Cupon;

  // Cupon.title = req.body.title;
  Cupon.content = req.body.content;
  Cupon.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(Cupon);
      setTimeout(function() {
        Cupon.content = 0;
        Cupon.save();
      }, 10000);
      
    }
  });
};

/**
 * Delete an Cupon
 */
exports.delete = function (req, res) {
  var Cupon = req.Cupon;

  Cupon.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(Cupon);
    }
  });
};

/**
 * List of Cupones
 */
exports.list = function (req, res) {
  Cupon.find().sort('-created').populate('user', 'displayName').exec(function (err, cupones) {
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

  Cupon.findById(id).populate('user', 'displayName').exec(function (err, Cupon) {
    if (err) {
      return next(err);
    } else if (!Cupon) {
      return res.status(404).send({
        message: 'No Cupon with that identifier has been found'
      });
    }
    req.Cupon = Cupon;
    next();
  });
};
