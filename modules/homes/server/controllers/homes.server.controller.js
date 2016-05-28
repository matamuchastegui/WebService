'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Home = mongoose.model('Home'),
  Comercio = mongoose.model('Comercio'),
  _ = require('lodash'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

exports.getHome = function(req, res){
  Comercio.find().sort('-created').limit(8).exec(function (err, comercios) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      var UltimosAdheridos = [];
      for (var i = comercios.length - 1; i >= 0; i--) {
        UltimosAdheridos.push({
          NombreComercio: comercios[i].NombreComercio,
          Image: comercios[i].UrlImageLogo,
          _id: comercios[i]._id});
      }
      Home.find().sort('-Orden').limit(1).exec(function (err, homes) {
        if (err) {
          return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          });
        } else {
          res.json({
            respCode: 0,
            respMessage: "OK",
            Banners: homes[0].Banners,
            UltimosAdheridos: UltimosAdheridos,
            OfertasDestacadas: homes[0].OfertasDestacadas,
            Favoritos: homes[0].Favoritos,
          });
        }
      });
    }
  });
  
};

exports.getCabeceras = function(req, res){
  var RegXPag = req.body.RegXPag;
  var Pag = req.body.Pag;
  Comercio.find().sort('-Orden').limit(RegXPag).skip(RegXPag * Pag).exec(function (err, comercios) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      var UltimosAdheridos = [];
      for (var i = comercios.length - 1; i >= 0; i--) {
        UltimosAdheridos.push({
          NombreComercio: comercios[i].NombreComercio,
          Image: comercios[i].UrlImageLogo,
          Slogan: comercios[i].Slogan,
          PuntuacionEstrellas: comercios[i].PuntuacionEstrellas,
          _id: comercios[i]._id}) ;
      }
      res.json({respCode: 0,
                respMessage: "OK",
                Cabeceras:UltimosAdheridos});
    }
  });
};
/**
 * Create a home
 */
exports.create = function (req, res) {
  console.log('reqb',req.body);
  var home = new Home(req.body);
  home.user = req.user;

  home.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(home);
    }
  });
};

/**
 * Show the current home
 */
exports.read = function (req, res) {
  if(req.bo)
    res.json(req.home);
  else
    res.json({
      RespCode:0, 
      RespMessage:'OK',
      Home: req.home
    });
};

/**
 * Update a home
 */
exports.update = function (req, res) {
  var home = req.home;
  home = _.extend(home, req.body);
  console.log('home',home.Favoritos[0].Items);
  home.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(home);
    }
  });
};

/**
 * Delete an home
 */
exports.delete = function (req, res) {
  var home = req.home;

  home.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(home);
    }
  });
};

/**
 * List of Homes
 */
exports.list = function (req, res) {
  var RegXPag = req.query.RegXPag;
  var Pag = req.query.Pag;
  Home.find().sort('-Orden').limit(RegXPag).skip(RegXPag * Pag).populate('user', 'displayName').exec(function (err, homes) {
    console.log('home',homes);
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(homes);
    }
  });
};

/**
 * Home middleware
 */
exports.homeByID = function (req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Home is invalid'
    });
  }

  Home.findById(id).populate('user', 'displayName').exec(function (err, home) {
    if (err) {
      return next(err);
    } else if (!home) {
      return res.status(404).send({
        message: 'No home with that identifier has been found'
      });
    }
    req.bo = req.query.bo;
    req.home = home;
    next();
  });
};
