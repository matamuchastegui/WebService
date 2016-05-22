'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Comentario = mongoose.model('Comentario'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a comentario
 */
exports.create = function (req, res) {
  var comentario = new Comentario(req.body);
  comentario.user = req.user;

  comentario.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(comentario);
    }
  });
};

/**
 * Show the current comentario
 */
exports.read = function (req, res) {
  res.json(parseInt(req.comentario.content));
};

/**
 * Update a comentario
 */
exports.update = function (req, res) {
  var comentario = req.comentario;

  // comentario.title = req.body.title;
  comentario.content = req.body.content;
  comentario.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(comentario);      
    }
  });
};

/**
 * Delete an comentario
 */
exports.delete = function (req, res) {
  var comentario = req.comentario;

  comentario.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(comentario);
    }
  });
};

/**
 * List of Comentarios
 */
exports.list = function (req, res) {
  var RegXPag = req.query.RegXPag;
  var Pag = req.query.Pag;
  Comentario.find().sort('-created').limit(RegXPag).skip(RegXPag * Pag).populate('user', 'displayName').exec(function (err, comentarios) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(comentarios);
    }
  });
};

exports.getComentarios = function (req, res) {
  res.json({
    RespCode:0,
    RespMessage:'Ok',
    TypeComent:"COMERCIO",
    Comentarios:[
      {
        ComentarioComercio:{
          ComentarioId:'132',
          Fecha:'11/05/1995 10:20',
          EntidadComentadaId:'123',
          ComentarioText:'Un producto espectacular',
          Puntuacion:5,
          IdUserComentarista:'123456',
          UrlImageUser:'https://s3-us-west-2.amazonaws.com/decomprasimg/test.jpg'
        }
      }
    ]
  });
};

/**
 * Comentario middleware
 */
exports.comentarioByID = function (req, res, next, id) {
  // Comentario.findOne(id).populate('user', 'displayName').exec(function (err, comentario) {
  //   if (err) {
  //     return next(err);
  //   } else if (!comentario) {
  //     return res.status(400).send({
  //       RespCode:1,
  //       RespMessage:'El comentario no existe'
  //     });
  //   }
  //   req.comentario = comentario;
    next();
  // });
};

exports.typeComent = function (req, res, next, id) {
  // Comentario.findOne(id).populate('user', 'displayName').exec(function (err, comentario) {
  //   if (err) {
  //     return next(err);
  //   } else if (!comentario) {
  //     return res.status(400).send({
  //       RespCode:1,
  //       RespMessage:'El comentario no existe'
  //     });
  //   }
  //   req.comentario = comentario;
    next();
  // });
};
