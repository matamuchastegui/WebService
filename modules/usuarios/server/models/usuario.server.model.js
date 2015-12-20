'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Usuario Schema
 */
var UsuarioSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  TipoRegistracion: {
    type: String,
    trim: true,
    required: 'Falta TipoRegistracion',
    default: 'C'
  },
  IdUsuario: {
    type: String,
    trim: true,
    required: 'Falta IdUsuario',
    unique: 'IdUsuario ya existe',
  },
  Nombre: {
    type: String,
    trim: true,
    required: 'Por favor ingrese su Nombre'
  },
  Apellido: {
    type: String,
    trim: true,
    required: 'Por favor ingrese su Apellido'
  },
  Sexo: {
    type: String,
    trim: true,
    default: 'U'
  },
  FechaNac: {
    type: String,
    trim: true
  },
  Email: {
    type: String,
    trim: true,
    required: 'Por favor ingrese su e-mail'
  },
  Password: {
    type: String,
    trim: true,
    default: ''
  }
});

mongoose.model('Usuario', UsuarioSchema);
