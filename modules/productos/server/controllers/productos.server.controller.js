'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Producto = mongoose.model('Producto'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a producto
 */
exports.create = function (req, res) {
  console.log('reqb',req.body);
  var producto = new Producto(req.body);
  producto.user = req.user;

  producto.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(producto);
    }
  });
};

/**
 * Show the current producto
 */
exports.read = function (req, res) {
  if(req.bo)
    res.json(req.producto);
  else
    res.json({
      RespCode:0, 
      RespMessage:'OK',
      Producto: req.producto
    });
};

/**
 * Update a producto
 */
exports.update = function (req, res) {
  var producto = req.producto;

  // producto.title = req.body.title;
  producto.content = req.body.content;
  producto.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(producto);
    }
  });
};

/**
 * Delete an producto
 */
exports.delete = function (req, res) {
  var producto = req.producto;

  producto.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(producto);
    }
  });
};

/**
 * List of Productos
 */
exports.list = function (req, res) {
  Producto.find().sort('-created').populate('user', 'displayName').exec(function (err, productos) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(productos);
    }
  });
};

/**
 * Producto middleware
 */
exports.productoByID = function (req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Producto is invalid'
    });
  }

  Producto.findById(id).populate('user', 'displayName').exec(function (err, producto) {
    if (err) {
      return next(err);
    } else if (!producto) {
      return res.status(404).send({
        message: 'No producto with that identifier has been found'
      });
    }
    req.bo = req.url.split('?').pop().split('&').pop().split('&').pop() === 'bo=true';
    req.producto = producto;
    next();
  });
};
