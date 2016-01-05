'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Usuario = mongoose.model('Usuario'),
  nodemailer = require('nodemailer'),
  config = require('../../../../config/config'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a usuario
 */
exports.create = function (req, res) {
  var usuario = new Usuario(req.body);
  usuario.user = req.user;

  usuario.save(function (err) {
    if (err) {
      return res.status(400).send({
        RespCode: 1,
        RespMessage: errorHandler.getErrorMessage(err),        
        Usuario: usuario
      });
    } else {
      var response = {
        RespCode: 0,
        RespMessage: 'Ok',
        Usuario: usuario
      };
      res.json(response);
    }
  });
};

exports.login = function (req, res) {
  Usuario.findOne({IdUsuario: req.body.IdUsuario}).exec(function (err, usuario) {
    if (err) {
      return res.status(400).send({
          RespCode: 1,
          RespMessage: errorHandler.getErrorMessage(err)
        });
    } else if (!usuario) {
      if(req.body.TipoRegistracion === 'F'){
        return res.status(400).send({
          RespCode: 1,
          RespMessage: 'Usuario no registrado logueado a través de facebook'
        });
      } else{
          return res.status(404).send({
            RespCode: 1,
            RespMessage: 'El usuario no existe'
          });
        }
    }
    if(usuario.Password && usuario.Password !== req.body.Password){
      return res.status(400).send({
        RespCode: 1,
        RespMessage: 'Password incorrecta',
        Usuario: usuario
      });
    } else{
      res.json({
        RespCode: 0,
        RespMessage: 'Ok',
        Usuario: usuario
      });
    }
  });
};



/**
 * Show the current usuario
 */
exports.read = function (req, res) {
  res.json(req.usuario);
};

exports.recuperarcontrasenia = function (req, res) {
  Usuario.findOne({IdUsuario: req.body.IdUsuario}).exec(function (err, usuario) {
    if (err) {
      return res.status(400).send({
          RespCode: 1,
          RespMessage: errorHandler.getErrorMessage(err)
        });
    } else if (!usuario) {
        return res.status(404).send({
          RespCode: 1,
          RespMessage: 'El usuario no existe'
        });
    }
    if(req.body.TipoRegistracion === 'F'){
      return res.status(400).send({
        RespCode: 1,
        RespMessage: 'Usuario registrado a través de facebook'
      });
    }
      console.log('usuario',usuario);
      console.log('pwd',usuario.Password);
      //Enviar mail
      res.render('modules/core/server/views/templates/forgot-password', {
        pwd: usuario.Password
      }, function(err, emailHTML) {
        var smtpTransport = nodemailer.createTransport('smtps://decompras.noreply%40gmail.com:FWew8lKW@smtp.gmail.com');
        var mailOptions = {
          to: usuario.Email,
          from: config.mailer.from,
          subject: 'Solicitud de recuperar contraseña',
          html: emailHTML
        };
        console.log('mailer',mailOptions);
        smtpTransport.sendMail(mailOptions, function(err, data) {
          console.log('data',data);
          if (!err) {
            res.json({
              RespCode: 0,
              RespMessage: 'Ok, se le ha reenviado su contraseña a su email'
            });
          } else {
             console.log('err',err);
            return res.status(400).send({
              message1: 'Error: no se ha podido enviar email.' 
            });
          }
        });
        
      },function(err) {
        if (err)
          return res.status(400).send({
            message2: 'Error: no se ha podido enviar email.'
          });
      });
      //Fin enviar mail
  });
};

/**
 * Update a usuario
 */
exports.editarperfil = function (req, res) {
  Usuario.findOne({IdUsuario: req.body.IdUsuario}).exec(function (err, usuario) {
    if (err) {
      return res.status(400).send({
          RespCode: 1,
          RespMessage: errorHandler.getErrorMessage(err)
        });
    } else if (!usuario) {
      return res.status(400).send({
        RespCode: 1,
        RespMessage: 'El usuario no existe'
      });
    }
    if(usuario.Password && usuario.Password !== req.body.Password){
      return res.status(400).send({
        RespCode: 1,
        RespMessage: 'Password incorrecta',
        Usuario: usuario
      });
    } else{
      usuario.TipoRegistracion = req.body.TipoRegistracion;
      usuario.Nombre = req.body.Nombre ? req.body.Nombre : usuario.Nombre;
      usuario.Apellido = req.body.Apellido ? req.body.Apellido : usuario.Apellido;
      usuario.Sexo = req.body.Sexo ? req.body.Sexo : usuario.Sexo;
      usuario.FechaNac = req.body.FechaNac ? req.body.FechaNac : usuario.FechaNac;
      usuario.Email = req.body.Email ? req.body.Email : usuario.Email;
      usuario.Password = req.body.Password ? req.body.Password : usuario.Password;

      usuario.save(function (err) {
        if (err) {
          return res.status(400).send({
            RespCode: 4,
            RespMessage: errorHandler.getErrorMessage(err)
          });
        } else {
          res.json({
            RespCode: 0,
            RespMessage: 'Ok',
            Usuario: usuario
          });
        }
      });
    }
  });
  
};

/**
 * Delete an usuario
 */
exports.delete = function (req, res) {
  var usuario = req.usuario;

  usuario.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(usuario);
    }
  });
};

/**
 * List of Usuarios
 */
exports.list = function (req, res) {
  Usuario.find().sort('-created').populate('user', 'displayName').exec(function (err, usuarios) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(usuarios);
    }
  });
};

/**
 * Usuario middleware
 */
exports.usuarioByID = function (req, res, next, id) {

  Usuario.findOne({IdUsuario: req.body.IdUsuario}).exec(function (err, usuario) {
    if (err) {
      return res.status(400).send({
          RespCode: 1,
          RespMessage: errorHandler.getErrorMessage(err)
        });
    } else if (!usuario) {
      if(req.body.TipoRegistracion === 'F'){
        return res.status(400).send({
          RespCode: 1,
          RespMessage: 'Usuario no registrado logueado a través de facebook'
        });
      } else{
          return res.status(404).send({
            RespCode: 1,
            RespMessage: 'El usuario no existe'
          });
        }
    }
    if(usuario.Password && usuario.Password !== req.body.Password){
      return res.status(400).send({
        RespCode: 1,
        RespMessage: 'Password incorrecta',
        Usuario: usuario
      });
    } else{
      next({
        RespCode: 0,
        RespMessage: 'Ok',
        Usuario: usuario
      });
    }
  });

};


